import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Sender = "user" | "bot";

type Message = {
  id: string;
  text: string;
  from: Sender;
};

const initialMessages: Message[] = [
  { id: "1", text: "Hi ONEGOV", from: "user" },
  { id: "2", text: "Hey Thinal, How can I assist you!", from: "bot" },
];

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("How do i apply for NIC!");
  const listRef = useRef<FlatList<Message>>(null);

  // Simple auto-id generator (good enough for demo)
  const nextId = useMemo(() => {
    let n = messages.length + 1;
    return () => String(n++);
  }, [messages.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const mine: Message = { id: nextId(), text, from: "user" };
    setMessages((prev) => [...prev, mine]);

    // Demo bot reply (so you can see both bubble styles)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          text:
            "Thanks for your question! I can guide you through the NIC application.",
          from: "bot",
        },
      ]);
      listRef.current?.scrollToEnd({ animated: true });
    }, 500);

    setDraft("");
    requestAnimationFrame(() =>
      listRef.current?.scrollToEnd({ animated: true })
    );
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.from === "user";
    return (
      <View
        style={[
          styles.row,
          { justifyContent: isMe ? "flex-end" : "flex-start" },
        ]}
      >
        <View
          style={[
            styles.bubble,
            isMe ? styles.meBubble : styles.botBubble,
            // Match iOS chat radii (tighter on the “arrow” corner)
            isMe ? styles.meRadius : styles.botRadius,
          ]}
        >
          <Text style={[styles.bubbleText, isMe && styles.meText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => {}}>
          <Ionicons name="chevron-back" size={26} />
        </Pressable>

        <Text style={styles.title}>ONEGOV AI</Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>T</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        contentContainerStyle={styles.listContent}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Input Bar (iOS-style) */}
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <View style={styles.inputBar}>
          <Pressable style={styles.roundBtn} onPress={() => {}}>
            <Ionicons name="add" size={22} />
          </Pressable>

          <TextInput
            style={styles.input}
            placeholder="Message"
            value={draft}
            onChangeText={setDraft}
            placeholderTextColor="#8E8E93"
            multiline
          />

          <Pressable
            style={[styles.sendBtn, draft.trim() ? styles.sendEnabled : null]}
            onPress={send}
            disabled={!draft.trim()}
          >
            <Ionicons
              name={draft.trim() ? "arrow-up" : "mic"}
              size={18}
              color={draft.trim() ? "#fff" : "#000"}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const IOS_BLUE = "#0A84FF";
const IOS_BUBBLE = "#F2F2F7";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
  },
  backBtn: { padding: 4, marginRight: 2 },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E5E5EA",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontWeight: "700", color: "#3A3A3C" },

  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },

  row: { width: "100%", flexDirection: "row" },

  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  botBubble: {
    backgroundColor: IOS_BUBBLE,
  },
  meBubble: {
    backgroundColor: IOS_BLUE,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 21,
    color: "#000",
  },
  meText: {
    color: "#fff",
  },

  // Rounded corners similar to iMessage
  botRadius: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 6,
  },
  meRadius: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 6,
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E5EA",
    backgroundColor: "#fff",
  },

  roundBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: IOS_BUBBLE,
  },

  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: IOS_BUBBLE,
    fontSize: 16,
  },

  sendBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E5EA",
  },
  sendEnabled: {
    backgroundColor: IOS_BLUE,
  },
});
