import { useState, type FC, type KeyboardEvent } from "react";
import { api } from "~/utils/api";

interface ChatInputProps {
  conversationId: string;
}

const ChatInput: FC<ChatInputProps> = ({ conversationId }) => {
  const [newMessageContent, setNewMessageContent] = useState("");
  const ctx = api.useContext();

  const { mutate: sendMessage } =
    api.messages.sendMessageToConversation.useMutation({
      onSuccess: async () => {
        await ctx.messages.getConversationsByUserId.invalidate();
      },
    });

  const handleSendMessage = () => {
    sendMessage({ message: newMessageContent, conversationId });
    setNewMessageContent("");
  };

  return (
    <div className="w-[60%]">
      <form>
        <label className="sr-only">Your message</label>
        <div className="flex items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700">
          <input
            onChange={(e) => setNewMessageContent(e.target.value)}
            value={newMessageContent}
            className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                handleSendMessage(e);
              }
            }}
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
