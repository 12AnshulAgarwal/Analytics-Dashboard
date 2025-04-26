
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Activity, BarChart3, MessageCircle, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { authState } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <div className="mx-auto mb-8 flex justify-center">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Real-Time Analytics Dashboard</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Monitor your metrics with our advanced real-time analytics dashboard and get support whenever you need it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to={authState.isAuthenticated ? "/dashboard" : "/login"}>
                  {authState.isAuthenticated ? "Go to Dashboard" : "Get Started"}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Support Chat
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Metrics</h3>
                <p className="text-muted-foreground">
                  Monitor your key performance indicators in real-time with automatic updates.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visual Analytics</h3>
                <p className="text-muted-foreground">
                  Beautiful charts and visualizations to help you understand your data at a glance.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Proactive Support</h3>
                <p className="text-muted-foreground">
                  Get help when you need it with our intelligent support chatbot.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Analytics Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
