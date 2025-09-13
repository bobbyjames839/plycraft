import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPaperPlane, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useToast } from './Toast';
import '../../styles/other/ChatWidget.css';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const ChatWidget: React.FC = () => {
  const { push } = useToast();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! I\'m the Plycraft assistant. Ask me about products or materials.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    }, [messages]);


  const canSend = input.trim().length > 0 && !loading;

  const handleToggle = () => setOpen(o => !o);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  const sendMessage = useCallback(async () => {
    if (!canSend) return;
    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], max_tokens: 256 })
      });
      if (!res.ok) {
        console.log('response not ok');
        const txt = await res.text();
        throw new Error(txt || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (e: any) {
  push('error', 'Chat error. Please try again.');
      setMessages(prev => prev.slice(0, -1)); // remove the optimistic user message? (choose to keep) -> comment out removal
    } finally {
      setLoading(false);
    }
  }, [backendUrl, canSend, input, messages, push]);

  const renderedMessages = useMemo(() => messages.map((m, i) => (
    <div key={i} className={`pc-chat-msg pc-${m.role}`}>{m.content}</div>
  )), [messages]);

  return (
    <div className="pc-chat-root" aria-live="polite">
      <button aria-label={open ? 'Close chat' : 'Open chat'} className="pc-chat-fab" onClick={handleToggle}>
        <FontAwesomeIcon icon={open ? faTimes : faComments} />
      </button>
      <div className={`${open ? 'pc-panel-open' : 'pc-panel-closed'}`} role="dialog" aria-modal="false" aria-label="Chat assistant">
        <div className="pc-chat-header">
          <span>Plycraft Assistant</span>
          <button className="pc-chat-close" onClick={handleToggle} aria-label="Close chat"><FontAwesomeIcon icon={faTimes} /></button>
        </div>
        <div className="pc-chat-body">
          {renderedMessages}
          {loading && <div className="pc-chat-msg pc-assistant loading"><FontAwesomeIcon icon={faSpinner} spin /> Thinking…</div>}
          <div ref={bottomRef} />
        </div>
        <div className="pc-chat-input-row">
          <input
            className="pc-chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="pc-chat-send" disabled={!canSend} onClick={sendMessage} aria-label="Send message">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};
