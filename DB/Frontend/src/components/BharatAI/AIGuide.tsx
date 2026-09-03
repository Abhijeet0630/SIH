import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Sparkles, 
  Compass, 
  CornerDownLeft,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  Volume2
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useCultural } from '../../context/CulturalContext';
import { aiService, AIChatMessage, AIQueryContext } from '../../services/aiService';

const formatInlineStyles = (textStr: string, isUserMessage: boolean) => {
  const parts = textStr.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={isUserMessage ? 'font-bold text-white' : 'font-bold text-parchment-950'}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const renderFormattedText = (text: string, isUserMessage: boolean) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-1 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header ###
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className={`font-bold text-xs sm:text-sm mt-2 mb-0.5 ${isUserMessage ? 'text-white' : 'text-category-temples'}`}>
              {formatInlineStyles(trimmed.slice(4), isUserMessage)}
            </h4>
          );
        }
        // Header ##
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className={`font-bold text-xs sm:text-sm mt-2 mb-0.5 ${isUserMessage ? 'text-white' : 'text-parchment-950'}`}>
              {formatInlineStyles(trimmed.slice(3), isUserMessage)}
            </h3>
          );
        }
        // Bullet list item (* or -)
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1.5 text-xs sm:text-sm my-0.5">
              <span className={`font-bold shrink-0 ${isUserMessage ? 'text-white' : 'text-category-temples'}`}>•</span>
              <span>{formatInlineStyles(trimmed.slice(2), isUserMessage)}</span>
            </div>
          );
        }
        // Numbered list item (e.g. 1. 2.)
        const numMatch = trimmed.match(/^(\d+\.)\s+(.+)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 font-medium text-xs sm:text-sm mt-1">
              <span className={`font-bold shrink-0 ${isUserMessage ? 'text-white' : 'text-category-temples'}`}>{numMatch[1]}</span>
              <span>{formatInlineStyles(numMatch[2], isUserMessage)}</span>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={idx} className="text-xs sm:text-sm">
            {formatInlineStyles(trimmed, isUserMessage)}
          </p>
        );
      })}
    </div>
  );
};

export const AIGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Namaste! I am your Bharat AI Cultural Companion. Ask me anything about India’s monuments, art traditions, forts, or recipes!',
      timestamp: 'Just now',
      avatarState: 'idle'
    }
  ]);
  const [isPending, setIsPending] = useState(false);
  const [currentAvatarState, setCurrentAvatarState] = useState<'idle' | 'thinking' | 'speaking'>('idle');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();
  const { currentState, selectedCategory, activeCulturalItem } = useCultural();
  const location = useLocation();

  // Compute live contextual hierarchy according to routing/context
  const currentContext: AIQueryContext = {
    stateId: currentState?.id,
    stateName: currentState?.name,
    categoryId: selectedCategory,
    categoryName: selectedCategory ? selectedCategory.toUpperCase() : undefined,
    itemTitle: activeCulturalItem?.title,
    itemSlug: activeCulturalItem?.slug,
    routePath: location.pathname,
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isPending]);

  // Handle Escape key to close chat drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isPending) return;

    const userMsg: AIChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsPending(true);
    setCurrentAvatarState('thinking');

    try {
      const response = await aiService.sendMessage(query, currentContext);
      setMessages(prev => [...prev, response]);
      if (response.avatarState) {
        setCurrentAvatarState(response.avatarState);
      } else {
        setCurrentAvatarState('speaking');
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: 'Your cultural guide is temporarily unavailable.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatarState: 'idle',
          isError: true,
          failedQuery: query
        }
      ]);
      setCurrentAvatarState('idle');
    } finally {
      setIsPending(false);
    }
  };

  const handleRetry = (failedQuery?: string) => {
    if (failedQuery) {
      handleSend(failedQuery);
    }
  };

  return (
    <>
      {/* Floating AI Launcher */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('ai.launcherLabel') || 'Open Bharat AI Cultural Guide'}
          aria-expanded={isOpen}
          className="relative group bg-gradient-to-r from-amber-700 to-amber-900 text-white p-4 rounded-full shadow-heritage-lg hover:shadow-heritage-glow transition-all duration-300 transform hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-amber-500/30"
        >
          <Bot className={`w-6 h-6 ${currentAvatarState === 'thinking' ? 'animate-spin' : currentAvatarState === 'speaking' ? 'animate-bounce' : 'animate-pulse-subtle'}`} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-sm pl-0 group-hover:pl-2">
            {t('ai.launcherLabel') || 'Bharat AI'}
          </span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentAvatarState === 'speaking' ? 'bg-emerald-400' : 'bg-amber-500'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${currentAvatarState === 'speaking' ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
          </span>
        </button>
      </div>

      {/* Expandable Responsive Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-label="Bharat AI Cultural Chat Window"
            className="fixed bottom-0 right-0 sm:bottom-24 sm:right-6 w-full sm:max-w-md h-[100dvh] sm:h-[580px] sm:max-h-[85vh] bg-parchment-50 border-t sm:border border-parchment-200 sm:rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden texture-parchment"
          >
            {/* Chat Header */}
            <div className="p-4 bg-white/90 border-b border-parchment-200 backdrop-blur-md flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white shadow-heritage-xs transition-all ${currentAvatarState === 'speaking' ? 'ring-2 ring-amber-500 ring-offset-1' : ''}`}>
                    <Bot className={`w-5 h-5 ${currentAvatarState === 'speaking' ? 'animate-pulse' : ''}`} />
                  </div>
                  {currentAvatarState === 'speaking' && (
                    <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white shadow-xs" title="Speaking">
                      <Volume2 className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-parchment-950 flex items-center gap-1.5">
                    Bharat AI Guide
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-parchment-600">
                    <span className={`w-2 h-2 rounded-full ${currentAvatarState === 'thinking' ? 'bg-amber-500 animate-ping' : currentAvatarState === 'speaking' ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                    <span className="capitalize">{currentAvatarState === 'thinking' ? 'Thinking...' : currentAvatarState === 'speaking' ? 'Speaking' : 'Online & Ready'}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-parchment-200 text-parchment-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                aria-label="Close chat window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Log Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5" role="log" aria-live="polite">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-700 text-white rounded-br-none shadow-heritage-xs'
                        : msg.isError
                        ? 'bg-rose-50 border border-rose-300 text-rose-950 rounded-bl-none shadow-heritage-xs'
                        : 'bg-white border border-parchment-200 text-parchment-950 rounded-bl-none shadow-heritage-xs'
                    }`}
                  >
                    {msg.isError ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 font-semibold text-rose-900">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{msg.text}</span>
                        </div>
                        {msg.failedQuery && (
                          <button
                            type="button"
                            onClick={() => handleRetry(msg.failedQuery)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800 transition-colors shadow-xs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Retry Question</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      renderFormattedText(msg.text, msg.sender === 'user')
                    )}

                    {/* Action Route Button */}
                    {msg.suggestedAction && !msg.isError && (
                      <div className="mt-2.5 pt-2 border-t border-parchment-200/60">
                        <Link
                          to={msg.suggestedAction.route}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition-colors shadow-xs"
                        >
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}

                    {/* Backend Suggestion Chips */}
                    {msg.suggestions && msg.suggestions.length > 0 && !msg.isError && (
                      <div className="mt-3 pt-2.5 border-t border-parchment-200/60 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-parchment-600 block">
                          Suggested Questions:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestions.map((sug, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSend(sug)}
                              className="text-left text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 px-2.5 py-1 rounded-lg transition-colors font-medium"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        msg.sender === 'user' ? 'text-white/80' : 'text-parchment-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {/* Pending Typing Indicator */}
              {isPending && (
                <div className="flex justify-start">
                  <div className="p-3 bg-white border border-parchment-200 rounded-2xl rounded-bl-none flex items-center gap-2 text-xs font-medium text-parchment-700 shadow-heritage-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-xs text-parchment-600 pl-1">Consulting cultural archives...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Default Quick Discovery Chips */}
            <div className="px-4 py-2 bg-parchment-100/50 border-t border-parchment-200/60 overflow-x-auto flex gap-2 no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => handleSend('Tell me about Vada Pav')}
                className="whitespace-nowrap text-[11px] bg-white border border-parchment-200 hover:border-amber-700 text-parchment-800 px-3 py-1 rounded-full transition-colors font-medium"
              >
                🍔 Vada Pav
              </button>
              <button
                type="button"
                onClick={() => handleSend('Tell me about the history of Raigad Fort')}
                className="whitespace-nowrap text-[11px] bg-white border border-parchment-200 hover:border-amber-700 text-parchment-800 px-3 py-1 rounded-full transition-colors font-medium"
              >
                🏯 Raigad Fort
              </button>
              <button
                type="button"
                onClick={() => handleSend('How are Living Root Bridges grown in Meghalaya?')}
                className="whitespace-nowrap text-[11px] bg-white border border-parchment-200 hover:border-amber-700 text-parchment-800 px-3 py-1 rounded-full transition-colors font-medium"
              >
                🌿 Root Bridges
              </button>
              <button
                type="button"
                onClick={() => handleSend('What is special about Assam Muga Silk?')}
                className="whitespace-nowrap text-[11px] bg-white border border-parchment-200 hover:border-amber-700 text-parchment-800 px-3 py-1 rounded-full transition-colors font-medium"
              >
                ✨ Muga Silk
              </button>
            </div>

            {/* Input Submission Bar */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-parchment-200 flex items-center gap-2 shrink-0"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  disabled={isPending}
                  onChange={e => setInput(e.target.value)}
                  placeholder={t('ai.placeholder') || 'Ask about monuments, recipes, forts...'}
                  aria-label="Type message for Bharat AI Guide"
                  className="w-full pl-3.5 pr-4 py-2.5 bg-parchment-50 border border-parchment-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 disabled:opacity-50 text-parchment-950 font-medium placeholder:text-parchment-500"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isPending}
                className="p-2.5 bg-amber-700 disabled:opacity-40 text-white rounded-xl hover:bg-amber-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-700/40 shrink-0"
                aria-label="Send message"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
