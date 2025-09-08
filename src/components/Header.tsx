import { Button } from "@/components/ui/button";
import { TrendingUp, User, Wallet, Bell, Search } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            BetVerse
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#sports" className="text-sm font-medium hover:text-primary transition-colors">
            Sports
          </a>
          <a href="#politics" className="text-sm font-medium hover:text-primary transition-colors">
            Politics
          </a>
          <a href="#entertainment" className="text-sm font-medium hover:text-primary transition-colors">
            Entertainment
          </a>
          <a href="#events" className="text-sm font-medium hover:text-primary transition-colors">
            Events
          </a>
          <a href="#create" className="text-sm font-medium hover:text-primary transition-colors">
            Create Bet
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full text-[10px] flex items-center justify-center text-white">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Wallet className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <Button size="sm" className="gradient-animated">
            Join Now
          </Button>
        </div>
      </div>
    </header>
  );
};