# Windows-compatible RAG Chat with Website
# Uses FAISS instead of Pinecone to avoid pwd module issue

import streamlit as st
import os
import sys

# Fix for Windows - mock the pwd module before any imports
class MockPwd:
    @staticmethod
    def getpwuid(uid):
        class User:
            pw_name = os.getenv('USERNAME', 'user')
        return User()

sys.modules['pwd'] = MockPwd()

from langchain_core.messages import AIMessage, HumanMessage
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from dotenv import load_dotenv

load_dotenv()

# Check for API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')

def get_vectorstore_from_url(url):
    """Load website content and create vector store"""
    loader = WebBaseLoader(url)
    document = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    document_chunks = text_splitter.split_documents(document)
    
    # Use FAISS for local vector storage (Windows compatible)
    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    vector_store = FAISS.from_documents(document_chunks, embeddings)
    
    return vector_store

def get_context_retriever_chain(vector_store):
    """Create retriever chain with chat history awareness"""
    llm = ChatOpenAI(openai_api_key=OPENAI_API_KEY)
    retriever = vector_store.as_retriever()
    
    prompt = ChatPromptTemplate.from_messages([
        MessagesPlaceholder(variable_name="chat_history"),
        ('user', "{input}"),
        ('user', "Given the above conversation, generate a search query to look up in order to get information relevant to conversation")
    ])
    
    retriever_chain = create_history_aware_retriever(llm, retriever, prompt)
    return retriever_chain

def get_conversational_rag_chain(retriever_chain):
    """Create conversational RAG chain"""
    llm = ChatOpenAI(openai_api_key=OPENAI_API_KEY)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "Answer the user's questions based on the below context:\n\n{context}"),
        MessagesPlaceholder(variable_name="chat_history"),
        ("user", "{input}"),
    ])
    
    stuff_documents_chain = create_stuff_documents_chain(llm, prompt)
    return create_retrieval_chain(retriever_chain, stuff_documents_chain)

def get_response(user_input):
    """Get AI response for user input"""
    retriever_chain = get_context_retriever_chain(st.session_state.vector_store)
    conversation_rag_chain = get_conversational_rag_chain(retriever_chain)
    
    response = conversation_rag_chain.invoke({
        "chat_history": st.session_state.chat_history,
        "input": user_input
    })
    
    return response['answer']

# Streamlit UI
st.set_page_config(page_title="RAG Chat with Websites", page_icon="🌐")
st.title("🌐 RAG Chat with Websites")
st.caption("Chat with any website using AI-powered retrieval")

# Sidebar
with st.sidebar:
    st.header("⚙️ Settings")
    
    # API Key input (if not in .env)
    if not OPENAI_API_KEY:
        api_key = st.text_input("OpenAI API Key", type="password")
        if api_key:
            os.environ['OPENAI_API_KEY'] = api_key
            OPENAI_API_KEY = api_key
    else:
        st.success("✅ API Key loaded from .env")
    
    st.divider()
    website_url = st.text_input("🔗 Website URL", placeholder="https://example.com")
    
    if st.button("Load Website", type="primary"):
        if website_url and OPENAI_API_KEY:
            with st.spinner("Loading website content..."):
                try:
                    st.session_state.vector_store = get_vectorstore_from_url(website_url)
                    st.session_state.website_loaded = True
                    st.success(f"✅ Loaded: {website_url}")
                except Exception as e:
                    st.error(f"Error: {str(e)}")
        elif not OPENAI_API_KEY:
            st.warning("Please enter your OpenAI API key")
        else:
            st.warning("Please enter a website URL")

# Main chat area
if not OPENAI_API_KEY:
    st.warning("⚠️ Please enter your OpenAI API key in the sidebar")
elif "website_loaded" not in st.session_state:
    st.info("👈 Enter a website URL in the sidebar and click 'Load Website' to start chatting")
else:
    # Initialize chat history
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = [
            AIMessage(content="Hello! I've loaded the website content. What would you like to know about it?")
        ]
    
    # Display chat messages
    for message in st.session_state.chat_history:
        if isinstance(message, AIMessage):
            with st.chat_message("assistant", avatar="🤖"):
                st.write(message.content)
        elif isinstance(message, HumanMessage):
            with st.chat_message("user", avatar="👤"):
                st.write(message.content)
    
    # Chat input
    if user_input := st.chat_input("Ask a question about the website..."):
        # Add user message
        st.session_state.chat_history.append(HumanMessage(content=user_input))
        with st.chat_message("user", avatar="👤"):
            st.write(user_input)
        
        # Get AI response
        with st.chat_message("assistant", avatar="🤖"):
            with st.spinner("Thinking..."):
                try:
                    response = get_response(user_input)
                    st.write(response)
                    st.session_state.chat_history.append(AIMessage(content=response))
                except Exception as e:
                    error_msg = f"Error getting response: {str(e)}"
                    st.error(error_msg)
                    st.session_state.chat_history.append(AIMessage(content=error_msg))

# Footer
st.sidebar.divider()
st.sidebar.caption("Powered by LangChain + OpenAI + FAISS")
