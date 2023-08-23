<template>
  <v-container>
    <v-row style="height: 70vh">
      <v-col>
        <v-sheet class="fill-height mb-10" style="border: 1px solid black">
          <h3 v-for="message in messages">{{message}}</h3>
        </v-sheet>
        <v-row>
          <v-col>
            <span>Chat</span>
            <v-text-field v-model="chat"></v-text-field>
            <v-btn @click="sendMessage">send</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import io from 'socket.io-client';
export default {
  name: "ChatComponent",
  data() {
    return {
      chat: null,
      messages: [],
      socket: null
    }
  },
  methods: {
    sendMessage() {
      this.socket.emit('message', this.chat);
    }
  },
  created() {
    this.socket = io("http://localhost:3000")
    this.socket.on('message', (data) => {
      this.messages.push(data);
    });
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
