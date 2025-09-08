import chatRoomData from './message.js';
import ChatRoom from './messageCRUD/ChatRoom.js';

const chat = new ChatRoom(chatRoomData);

chat.sendMessage("Hello from user1 again!", "user1");

console.log(chat.listMessages('desc'));

chat.addParticipant("user3");
chat.removeParticipant("user2", false);

chat.editMessage("message1", "user1", "Hi Bob, how have you been?");

chat.deleteMessage("message3");

const filtered = chat.filterMessages({ keyword: "Hi" });
console.log(filtered);

console.log(chat.timeAgo(chat.messages[0].timestamp));
