# React-Chatbox
Just a simple react chat interface.

Test data can be set in the DEVCHATSTACK constant, format is:
[\
  {\
    id: <int -> ID number of the message>,\
    sender: < 0 | 1 -> the sender of the message. Determines message position, 0 = left, 1 = right>\
    message: <string -> the message to be displayed>\
  },\
  ...\
]\
