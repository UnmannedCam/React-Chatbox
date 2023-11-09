import './App.css';
import {useState, useRef} from "react";
import React from "react";

const DEVCHATSTACK = [
    {id: 0, sender: 0, message: 'This is test bubble 1'},
    {id: 1, sender: 1, message: 'This is test bubble 2'},
    {id: 2, sender: 1, message: 'This is test bubble 3'},
    {id: 3, sender: 0, message: 'this is test bubble 4. It\'s quite long. See how long it is? Wow, it really is long.'},
    {id: 4, sender: 1, message: 'This is yet another bubble, 5'}
];

const Container = (props) => {
    return (
        <div className={'background'}>
            {props.children}
        </div>
    );
}


const ChatContainer = props => {
    let [chats, setChats] = useState(props.chatStack);
    const chatScroller = useRef();
    const scrollToLast = () => {
        console.log(chatScroller.current)
        chatScroller.current.scrollIntoView();
    }

    return (
        <div className={'chat-container'}>
            <ChatStack chatStack={chats} ref={chatScroller}/>
            <MessageSender chats={chats} setChats={setChats} scrollerFunc={scrollToLast}/>
        </div>
    )
}


const ChatStack = React.forwardRef((props, ref) => {
    return (
        <div className={'chat-stack'}>
            {props.chatStack.map(chat => <ChatBlock blockInfo={chat} ref={ref} />)}
        </div>
    );
});


const MessageSender = props => {

    const setChats = props.setChats;
    const chats = props.chats;
    const scrollerFunc = props.scrollerFunc;

    const sendMessage = async inputBox => {
        if (!inputBox.value) {
            return
        }
        await setChats([...chats, {id: 5, sender: 1, message: inputBox.value}]);
        inputBox.value = '';
        scrollerFunc();
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage(e.target);
        }
    }

    return (
        <input placeholder={'Type a message...'} className={'chat-input'} onKeyDown={_handleKeyDown} />
    )
}


const ChatBlock = React.forwardRef((props, ref) => {
    return (
        <div className={`chat-block sender-${props.blockInfo.sender}`}>
            <ChatBubble sender={props.blockInfo.sender} message={props.blockInfo.message} ref={ref}/>
        </div>
    );
});


const ChatBubble = React.forwardRef((props, ref) => {
    return (
        <div className={`chat-bubble`} ref={ref}>
            {props.message}
        </div>
    );
});

const App = () => {
    return (
        <Container>
            <ChatContainer chatStack={DEVCHATSTACK} />
        </Container>
    );
}

export default App;
