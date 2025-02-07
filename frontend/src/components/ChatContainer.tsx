import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'

function ChatContainer() {
  return (
    <div className='flex  flex-1 flex-col overflow-auto'>
      <ChatHeader/>
      {"messgaess"}
      <ChatInput/>
    </div>
  )
}

export default ChatContainer