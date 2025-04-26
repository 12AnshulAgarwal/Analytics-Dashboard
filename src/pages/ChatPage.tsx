
import Header from '@/components/Header';
import ChatBox from '@/components/chat/ChatBox';

const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Support Chat</h1>
          <p className="text-muted-foreground mb-6">
            Need help with the analytics dashboard? Our virtual assistant is here to help you!
          </p>
          <ChatBox />
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
