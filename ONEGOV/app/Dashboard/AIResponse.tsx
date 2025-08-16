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

type Message =
  | {
      id: string;
      from: Sender;
      text: string;
      kind?: "text";
      showName?: boolean; // force show name label above bubble
    }
  | {
      id: string;
      from: "bot";
      kind: "guide"; // special “card” with numbered list
      title: string;
      steps: string[];
      showName?: boolean;
    };

const NAMES: Record<Sender, string> = {
  user: "Thinal",
  bot: "ONEGOV AI",
};

const initialMessages: Message[] = [
  { id: "1", from: "user", text: "Hi ONEGOV", showName: true },
  { id: "2", from: "bot", text: "Hey Thinal, How can I assist you!", showName: true },
  { id: "3", from: "user", text: "I want to make my NIC", showName: true },
  { id: "4", from: "bot", text: "Great, let me assist you,", showName: false },
  { id: "5", from: "user", text: "How do i apply for NIC!", showName: true },
  {
    id: "6",
    from: "bot",
    kind: "guide",
    showName: true,
    title: "OHH Thinal this is the step by step Guide on how to apply for NIC!",
    steps: [
      "First Go to the services Page",
      "Then select category citizen Identification",
      "Then there you can select NIC",
      "Follow the steps and fill the form",
    ],
  },
];

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const listRef = useRef<FlatList<Message>>(null);

  // simple id generator
  const nextId = useMemo(() => {
    let n = messages.length + 1;
    return () => String(n++);
  }, [messages.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;

    const mine: Message = { id: nextId(), from: "user", text, kind: "text" };
    setMessages((prev) => [...prev, mine]);
    setDraft("");

    // demo bot reply
    setTimeout(() => {
      const reply: Message = {
        id: nextId(),
        from: "bot",
        text: "Got it! I can fetch the NIC guide for you.",
        kind: "text",
      };
      setMessages((prev) => [...prev, reply]);
      listRef.current?.scrollToEnd({ animated: true });
    }, 500);

    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  // show name label when forced or when speaker changes from previous message
  const shouldShowName = (index: number) => {
    const m = messages[index];
    if ("from" in m && m.showName) return true;
    if (index === 0) return true;
    return messages[index - 1].from !== m.from;
  };

  const renderBubble = (item: Message, index: number) => {
    const isMe = item.from === "user";
    const align: "flex-start" | "flex-end" = isMe ? "flex-end" : "flex-start";
    const name = NAMES[item.from];

    // name label
    const NameLabel = shouldShowName(index) ? (
      <Text
        style={[
          styles.nameLabel,
          { textAlign: isMe ? "right" : "left", alignSelf: align },
        ]}
      >
        {name}
      </Text>
    ) : null;

    if (item.kind === "guide") {
      return (
        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          <View style={{ flex: 1 }}>
            {NameLabel}
            <View style={styles.guideCard}>
              <Text style={styles.guideTitle}>{item.title}</Text>
              <View style={{ marginTop: 8 }}>
                {item.steps.map((s, i) => (
                  <View key={i} style={styles.stepRow}>
                    <Text style={styles.stepIndex}>{i + 1}.</Text>
                    <Text style={styles.stepText}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      );
    }

    // standard text bubble
    return (
      <View style={[styles.row, { justifyContent: align }]}>
        <View style={{ maxWidth: "78%" }}>
          {NameLabel}
          <View
            style={[
              styles.bubble,
              isMe ? styles.meBubble : styles.botBubble,
              isMe ? styles.meRadius : styles.botRadius,
            ]}
          >
            <Text style={[styles.bubbleText, isMe && styles.meText]}>
              {item.text}
            </Text>
          </View>
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
        renderItem={({ item, index }) => renderBubble(item, index)}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Floating composer */}
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <View style={styles.composerWrap}>
          <Pressable style={styles.plusBtn} onPress={() => {}}>
            <Ionicons name="add" size={22} />
          </Pressable>

          <View style={styles.composer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#8E8E93"
              value={draft}
              onChangeText={setDraft}
              multiline
            />

            <Pressable
              style={[styles.sendBtn, !!draft.trim() && styles.sendEnabled]}
              onPress={send}
              disabled={!draft.trim()}
            >
              <Ionicons
                name="arrow-up"
                size={16}
                color={draft.trim() ? "#fff" : "#8E8E93"}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

/* ===== Styles ===== */
const IOS_BLUE = "#0A84FF";
const IOS_BUBBLE = "#F2F2F7";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  /* Header */
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

  /* Messages */
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  row: { width: "100%", flexDirection: "row" },

  nameLabel: {
    fontSize: 12,
    marginBottom: 4,
    color: "#8E8E93",
  },

  bubble: {
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
  meText: { color: "#fff" },

  // Asymmetric radii to mimic iOS bubbles
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

  /* Guide Card (bot) */
  guideCard: {
    backgroundColor: IOS_BUBBLE,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  guideTitle: {
    fontSize: 14,
    color: "#111",
    lineHeight: 20,
    fontWeight: "600",
  },
  stepRow: { flexDirection: "row", gap: 8, marginTop: 4 },
  stepIndex: { width: 16, textAlign: "right", fontSize: 14, color: "#111" },
  stepText: { flex: 1, fontSize: 14, color: "#111", lineHeight: 20 },

  /* Composer */
  composerWrap: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    backgroundColor: "transparent",
  },
  plusBtn: {
    position: "absolute",
    left: 18,
    bottom: 18,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: IOS_BUBBLE,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 44, // space for the + button overlay
    paddingRight: 8,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    minHeight: 36,
    maxHeight: 120,
  },
  sendBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E5EA",
    marginLeft: 6,
  },
  sendEnabled: { backgroundColor: IOS_BLUE },
});
