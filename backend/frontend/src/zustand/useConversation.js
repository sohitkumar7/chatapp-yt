import { create } from "zustand";

const useConversation = create((set) => ({
    selectedconversation: null,
    setselectedconversation: (selectedconversation) => set({ selectedconversation }),

    messages: [],
    setMessage: (newMessages) => set({ messages: newMessages }),

    addMessageToCurrentChat: (newMessage) => set((state) => {
        // Only add message if it's from or to the currently selected conversation
        if (state.selectedconversation && 
            (state.selectedconversation._id === newMessage.senderId || 
             state.selectedconversation._id === newMessage.receiverId)) {
            return { messages: [...state.messages, newMessage] };
        }
        return {}; // No change if it's not the current chat
    }),
}));

export default useConversation;
