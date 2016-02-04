import Ember from 'ember';

export default Ember.Component.extend({

  socketService: Ember.inject.service('websockets'),

  sum: 0,
  isOpen: false,
  numbers: [],

  receiveMessage(event) {
    console.log('Message: ' + event.data);
    let message = JSON.parse(event.data);
    let newSum = this.get('sum') + parseInt(message.number, 10);

    this.get('numbers').unshiftObject(message.number);
    this.set('sum', newSum);
  },

  connect() {
    let socket = this.get('socketService').socketFor('ws://localhost:8080/');

    socket.on('open', function() {
      console.log('Socket connected.');
    });
    socket.on('message', this.receiveMessage.bind(this));
    this.set('isOpen', true);
  },

  actions: {
    start() {
      this.connect();
    },
    stop() {
      this.get('socketService').closeSocketFor('ws://localhost:8080/');
      this.set('isOpen', false);
    },
    reset() {
      this.set('sum', 0);
      this.set('numbers', []);
    }
  }
});
