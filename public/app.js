!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},s={},a={},n={}.hasOwnProperty,r=/^\.\.?(\/|$)/,i=function(e,t){for(var s,a=[],n=(r.test(t)?e+"/"+t:t).split("/"),i=0,o=n.length;i<o;i++)s=n[i],".."===s?a.pop():"."!==s&&""!==s&&a.push(s);return a.join("/")},o=function(e){return e.split("/").slice(0,-1).join("/")},c=function(t){return function(s){var a=i(o(t),s);return e.require(a,t)}},u=function(e,t){var a=null;a=m&&m.createHot(e);var n={id:e,exports:{},hot:a};return s[e]=n,t(n.exports,c(e),n),n.exports},l=function(e){return a[e]?l(a[e]):e},d=function(e,t){return l(i(o(e),t))},h=function(e,a){null==a&&(a="/");var r=l(e);if(n.call(s,r))return s[r].exports;if(n.call(t,r))return u(r,t[r]);throw new Error("Cannot find module '"+e+"' from '"+a+"'")};h.alias=function(e,t){a[t]=e};var f=/\.[^.\/]+$/,p=/\/index(\.[^\/]+)?$/,_=function(e){if(f.test(e)){var t=e.replace(f,"");n.call(a,t)&&a[t].replace(f,"")!==t+"/index"||(a[t]=e)}if(p.test(e)){var s=e.replace(p,"");n.call(a,s)||(a[s]=e)}};h.register=h.define=function(e,a){if("object"==typeof e)for(var r in e)n.call(e,r)&&h.register(r,e[r]);else t[e]=a,delete s[e],_(e)},h.list=function(){var e=[];for(var s in t)n.call(t,s)&&e.push(s);return e};var m=e._hmr&&new e._hmr(d,h,t,s);h._cache=s,h.hmr=m&&m.wrap,h.brunch=!0,e.require=h}}(),function(){var e;window;require.register("actions.js",function(e,t,s){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t["default"]=e,t}Object.defineProperty(e,"__esModule",{value:!0}),e.initialFetchChats=e.initialFetchUsers=e.initialFetchCurrentUser=e.loadChatMessages=e.createChat=e.incrementChatMessagesPageNumber=e.initLoadChatMessagesInfo=e.addNewChat=e.changeIsTypingState=e.readChatMessage=e.addNewChatMessage=e.selectChat=void 0;var n=t("utils/apiCalls"),r=t("utils/utils"),i=t("utils/constants"),o=a(i),c=t("utils/actionTypes"),u=a(c),l=e.selectChat=function(e){return{type:u.SELECT_CHAT,chatId:e}},d=(e.addNewChatMessage=function(e,t){return{type:u.ADD_NEW_CHAT_MESSAGE,chatId:e,message:t}},e.readChatMessage=function(e){return{type:u.READ_CHAT_MESSAGE,chatId:e}},e.changeIsTypingState=function(e){return{type:u.CHANGE_IS_TYPING_STATE,chatId:e}},e.addNewChat=function(e){return{type:u.ADD_NEW_CHAT,chat:e}}),h=e.initLoadChatMessagesInfo=function(e){return{type:u.INIT_LOAD_CHAT_MESSAGES_INFO,chatId:e}},f=e.incrementChatMessagesPageNumber=function(e){return{type:u.INCREMENT_CHAT_MESSAGE_PAGE_NUMBER,chatId:e}},p=(e.createChat=function(e){return function(t){(0,n.createChat)(e).then(function(e){if(e.type===o.CHAT_ALREADY_EXISTS){var s=e.chat_id;t(p(s)),t(l(s))}else e.type===o.CHAT_NEW&&!function(){var s=e.chat.chat_id,a=new WebSocket("ws://127.0.0.1:8888/tornado_chat/"+s+"/");(0,r.waitForSocketConnection)(a,function(){a.send(JSON.stringify({type:o.DISPLAY_CHAT_ON_RECIPIENT_SIDE,chat:e.chat})),a.close()}),t(d(e.chat)),t(l(s))}()})}},e.loadChatMessages=function(e){return function(t,s){var a=void 0;s().chatMessagesLoadInfo[e]?a=s().chatMessagesLoadInfo[e].pageNumber:(a=0,t(h(e))),(0,n.loadChatMessages)(e,a+1).then(function(s){var n=s.chat_messages,r=s.has_more_chat_messages;t({type:u.SET_HAS_MORE_CHAT_MESSAGES_VALUE,chatId:e,hasMore:r}),t({type:u.RECEIVE_CHAT_MESSAGES,chatId:e,chatMessages:n}),a&&t(f(e))})}});e.initialFetchCurrentUser=function(){return function(e){(0,n.getCurrentUser)().then(function(t){e({type:u.RECEIVE_CURRENT_USER,user:t})})}},e.initialFetchUsers=function(){return function(e){(0,n.getAllUsers)().then(function(t){e({type:u.RECEIVE_USERS,users:t})})}},e.initialFetchChats=function(){return function(e){(0,n.getUserChats)().then(function(t){e({type:u.RECEIVE_CHATS,chats:t})})}}}),require.register("components/Chat.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var n=t("react"),r=a(n),i=t("utils/utils");e["default"]=r["default"].createClass({displayName:"Chat",propTypes:{chat:r["default"].PropTypes.object.isRequired,selectedChat:r["default"].PropTypes.string.isRequired,onSelect:r["default"].PropTypes.func.isRequired},handleClick:function(){this.props.onSelect(this.props.chat.chat_id)},render:function(){var e=this.props,t=e.chat,s=e.selectedChat,a=t.chat_id===s?"Chat-selected":"Chat",n=t.last_message_is_read?"LastMessage":"LastMessage-unread",o=(0,i.getMessageTimestamp)(new Date(t.last_message_timestamp));return r["default"].createElement("div",{className:a,onClick:this.handleClick},r["default"].createElement("div",{className:"ChatInfo"},r["default"].createElement("span",null,t.interlocutor_username),r["default"].createElement("div",{className:"LastMessageTimestamp"},o)),r["default"].createElement("div",{className:n},t.is_interlocutor_typing?r["default"].createElement("div",{className:"LoadingDots"},t.interlocutor_username," is typing"):t.last_message))}})}),require.register("components/ChatView.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}var n=t("react"),r=a(n),i=t("react-dom"),o=a(i),c=t("lodash.clone"),u=a(c),l=r["default"].createClass({displayName:"ChatView",propTypes:{flipped:r["default"].PropTypes.bool,scrollLoadThreshold:r["default"].PropTypes.number,onInfiniteLoad:r["default"].PropTypes.func.isRequired,loadingSpinnerDelegate:r["default"].PropTypes.element,className:r["default"].PropTypes.string},getDefaultProps:function(){return{flipped:!1,scrollLoadThreshold:10,loadingSpinnerDelegate:r["default"].createElement("div",null),className:""}},getInitialState:function(){return this.rafRequestId=null,this.scrollTop=0,this.scrollHeight=void 0,{isInfiniteLoading:!1}},componentWillUpdate:function(e,t){},render:function(){var e=(0,u["default"])(this.props.children);this.props.flipped&&e.reverse();var t=r["default"].createElement("div",{ref:"loadingSpinner"},this.state.isInfiniteLoading?this.props.loadingSpinnerDelegate:null);return r["default"].createElement("div",{className:this.props.className,ref:"scrollable",style:{overflowX:"hidden",overflowY:"scroll"}},r["default"].createElement("div",{ref:"smoothScrollingWrapper"},this.props.flipped?t:null,e,this.props.flipped?null:t))},pollScroll:function(){var e=this,t=o["default"].findDOMNode(this);if(t.scrollTop!==this.scrollTop){if(this.shouldTriggerLoad(t)){this.setState({isInfiniteLoading:!0});var s=this.props.onInfiniteLoad();s.then(function(){return e.setState({isInfiniteLoading:!1})})}this.updateScrollTop()}this.rafRequestId=window.requestAnimationFrame(this.pollScroll)},isPassedThreshold:function(e,t,s,a,n){return e?s<=t:s>=a-n-t},shouldTriggerLoad:function(e){var t=this.isPassedThreshold(this.props.flipped,this.props.scrollLoadThreshold,e.scrollTop,e.scrollHeight,e.clientHeight);return t&&!this.state.isInfiniteLoading},componentDidMount:function(){var e=o["default"].findDOMNode(this),t=this.props.flipped?e.scrollHeight-e.clientHeight:0;e.scrollTop=t,this.scrollTop=t,this.rafRequestId=window.requestAnimationFrame(this.pollScroll)},componentWillUnmount:function(){window.cancelAnimationFrame(this.rafRequestId)},componentDidUpdate:function(e,t){this.updateScrollTop()},updateScrollTop:function(){var e=o["default"].findDOMNode(this),t=e.scrollTop+(this.props.flipped?e.scrollHeight-(this.scrollHeight||0):0);t!==e.scrollTop&&(e.scrollTop=t),this.scrollTop=e.scrollTop,this.scrollHeight=e.scrollHeight}});s.exports=l}),require.register("components/Footer.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var n=t("react"),r=a(n);e["default"]=function(){return r["default"].createElement("div",{className:"Footer"},"Made by ",r["default"].createElement("a",{href:"https://github.com/Venskiy/",target:"_blank"},"Venskiy Ilya"),". ",r["default"].createElement("a",{href:"https://github.com/Venskiy/chat",target:"_blank"},"Github repository"),".")}}),require.register("components/MessageForm.jsx",function(e,t,s){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t["default"]=e,t}function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),i=n(r),o=t("react-dom"),c=n(o),u=t("utils/utils"),l=t("utils/constants"),d=a(l),h=void 0,f=void 0,p=!1;e["default"]=i["default"].createClass({displayName:"MessageForm",propTypes:{chat:i["default"].PropTypes.object.isRequired},componentWillMount:function(){var e=this.props.chat;h=new WebSocket("ws://127.0.0.1:8888/tornado_chat/"+e.chat_id+"/")},componentDidMount:function(){var e=this.props.chat;e.last_message_is_read||e.last_message_sender_id.toString()!==e.interlocutor_id.toString()||!function(){var t={type:d.READ_MESSAGE,interlocutorId:e.interlocutor_id};(0,u.waitForSocketConnection)(h,function(){h.send(JSON.stringify(t))})}()},componentWillUpdate:function(e){var t=e.chat;t.chat_id!==this.props.chat.chat_id&&(h.close(),h=new WebSocket("ws://127.0.0.1:8888/tornado_chat/"+e.chat.chat_id+"/"))},componentDidUpdate:function(){var e=this.props.chat;e.last_message_is_read||e.last_message_sender_id.toString()!==e.interlocutor_id.toString()||!function(){var t={type:d.READ_MESSAGE,interlocutorId:e.interlocutor_id};(0,u.waitForSocketConnection)(h,function(){h.send(JSON.stringify(t))})}()},componentWillUnmount:function(){var e=this.props.chat;p&&(clearTimeout(f),p=!1,h.send(JSON.stringify({type:d.IS_USER_TYPING,interlocutorId:e.interlocutor_id})))},handleKeyDown:function(e){e.shiftKey||13!=e.keyCode||(e.preventDefault(),c["default"].findDOMNode(this.refs.SendButton).click())},handleKeyPress:function(){var e=this.props.chat;clearTimeout(f);this.refs.message.value;p||(p=!0,h.send(JSON.stringify({type:d.IS_USER_TYPING,interlocutorId:e.interlocutor_id}))),f=setTimeout(function(){p=!1,h.send(JSON.stringify({type:d.IS_USER_TYPING,interlocutorId:e.interlocutor_id}))},3e3)},handleClick:function(){var e=this.refs.message.value;if(""!==e.replace(/\s+/g,"")){var t={type:d.SEND_MESSAGE,interlocutorId:this.props.chat.interlocutor_id,message:e};h.send(JSON.stringify(t)),this.refs.message.value=""}},render:function(){return i["default"].createElement("div",{className:"MessageForm"},i["default"].createElement("div",{className:"NewsLine"},this.props.chat.is_interlocutor_typing?i["default"].createElement("div",{className:"LoadingDots"},this.props.chat.interlocutor_username," is typing"):i["default"].createElement("div",null)),i["default"].createElement("textarea",{ref:"message",type:"text",placeholder:"Type your text here",onKeyDown:this.handleKeyDown,onKeyPress:this.handleKeyPress,onKeyUp:this.handleKeyUp}),i["default"].createElement("button",{ref:"SendButton",onClick:this.handleClick}))}})}),require.register("components/MessagesBlock.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var n=t("react"),r=a(n),i=t("dateformat"),o=a(i),c=t("react-dom"),u=(a(c),t("utils/utils")),l=t("./ChatView"),d=a(l);e["default"]=r["default"].createClass({displayName:"MessagesBlock",propTypes:{chatMessages:r["default"].PropTypes.array.isRequired,chatId:r["default"].PropTypes.string.isRequired,loadInfo:r["default"].PropTypes.object.isRequired,onLoadMessages:r["default"].PropTypes.func.isRequired},loadMessages:function(){var e=this.props.chatId,t=this.props.loadInfo,s=this.props.onLoadMessages;return new Promise(function(a,n){t.hasMore&&s(e),a()})},render:function(){var e=this.props,t=e.chatMessages,s=(e.chatId,e.loadInfo,e.onLoadMessages,t.length);return r["default"].createElement(d["default"],{className:"MessagesBlock",flipped:!0,scrollLoadThreshold:0,onInfiniteLoad:this.loadMessages,loadingSpinnerDelegate:r["default"].createElement("div",{className:"Loader"})},t.map(function(e,a){var n=e.is_read?"Message":"Message-unread",i=new Date(e.timestamp),c=a===s-1,l=void 0;return l=0===a?new Date(t[a].timestamp):new Date(t[a-1].timestamp),r["default"].createElement("div",{key:"message"+a},c?r["default"].createElement("div",{className:"MessagesBlockDate"},(0,o["default"])(i,"mmmm d, yyyy")):"",r["default"].createElement("div",{className:n},r["default"].createElement("div",{className:"MessageInfo"},r["default"].createElement("div",{className:"MessageSender"},e.sender__username),r["default"].createElement("div",{className:"MessageTimestamp"},(0,o["default"])(i,"h:MM:ss TT"))),r["default"].createElement("div",{className:"MessageText"},e.text)),(0,u.compareDatesWithoutTime)(l,i)?r["default"].createElement("div",{className:"MessagesBlockDate"},(0,o["default"])(l,"mmmm d, yyyy")):"")}))}})}),require.register("components/User.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var n=t("react"),r=a(n);e["default"]=r["default"].createClass({displayName:"User",propTypes:{username:r["default"].PropTypes.string.isRequired,onChatCreate:r["default"].PropTypes.func.isRequired},handleClick:function(){this.props.onChatCreate(this.props.username)},render:function(){var e=this.props.username;return r["default"].createElement("div",{className:"User"},r["default"].createElement("div",null,e),r["default"].createElement("button",{onClick:this.handleClick},"Start chat"))}})}),require.register("container/App.jsx",function(e,t,s){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t["default"]=e,t}function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),i=n(r),o=t("react-redux"),c=t("actions"),u=t("utils/constants"),l=a(u),d=t("./ChatsList"),h=n(d),f=t("./ChatWindow"),p=n(f),_=t("./UsersList"),m=n(_),g=t("components/Footer"),E=n(g),C=i["default"].createClass({displayName:"App",componentWillUpdate:function(e){var t=this;e.currentUser!==this.props.currentUser&&!function(){var s=t.props,a=s.onNewChatMessage,n=s.onMessageRead,r=s.onInterlocutorTyping,i=s.onNewChat,o=new WebSocket("ws://127.0.0.1:8888/chat_app/"+e.currentUser.user_id+"/");o.onmessage=function(e){var t=JSON.parse(e.data);switch(t.type){case l.SEND_MESSAGE:a(t.chat_id,t.message);break;case l.READ_MESSAGE:n(t.chat_id);break;case l.IS_USER_TYPING:r(t.chat_id);break;case l.DISPLAY_CHAT_ON_RECIPIENT_SIDE:i(t.chat)}}}()},render:function(){return i["default"].createElement("div",null,i["default"].createElement("div",{className:"Container"},i["default"].createElement(h["default"],{chats:this.props.chats,selectedChat:this.props.selectedChat}),i["default"].createElement(p["default"],{chats:this.props.chats,selectedChat:this.props.selectedChat}),i["default"].createElement(m["default"],null)),i["default"].createElement(E["default"],null))}}),S=function(e){return{currentUser:e.currentUser,chats:e.chats,selectedChat:e.selectedChat}},M=function(e){return{onNewChatMessage:function(t,s){e((0,c.addNewChatMessage)(t,s))},onMessageRead:function(t){e((0,c.readChatMessage)(t))},onInterlocutorTyping:function(t){e((0,c.changeIsTypingState)(t))},onNewChat:function(t){e((0,c.addNewChat)(t))}}};e["default"]=(0,o.connect)(S,M)(C)}),require.register("container/ChatWindow.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var n=t("react"),r=a(n),i=t("react-redux"),o=t("actions"),c=t("components/MessagesBlock"),u=a(c),l=t("components/MessageForm"),d=a(l),h=function(e){var t=e.chats,s=e.selectedChat,a=e.messages,n=e.chatMessagesLoadInfo,i=e.onChatMessagesLoad;return s&&a[s]?r["default"].createElement("div",{className:"ChatWindow"},r["default"].createElement(u["default"],{chatMessages:a[s],chatId:s.toString,loadInfo:n[s],onLoadMessages:i}),r["default"].createElement(d["default"],{chat:t[s]})):r["default"].createElement("div",{className:"ChatWindow-empty"},"Please, select a chat or create a new one!")},f=function(e){return{messages:e.messages,chatMessagesLoadInfo:e.chatMessagesLoadInfo}},p=function(e){return{onChatMessagesLoad:function(t){e((0,o.loadChatMessages)(t))}}};e["default"]=(0,i.connect)(f,p)(h)}),require.register("container/ChatsList.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var n=t("react"),r=a(n),i=t("react-redux"),o=t("actions"),c=t("components/Chat"),u=a(c),l=function(e){var t=e.chats,s=e.selectedChat,a=e.onChatSelect;return r["default"].createElement("div",{className:"ChatList"},Object.keys(t).sort(function(e,s){return t[e].last_message_timestamp>t[s].last_message_timestamp?-1:t[e].last_message_timestamp<t[s].last_message_timestamp?1:0}).map(function(e){return r["default"].createElement(u["default"],{chat:t[e],selectedChat:s.toString(),onSelect:a,key:e})}))},d=function(e){return{}},h=function(e){return{onChatSelect:function(t){e((0,o.loadChatMessages)(t)),e((0,o.selectChat)(t))}}};e["default"]=(0,i.connect)(d,h)(l)}),require.register("container/UsersList.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var n=t("react"),r=a(n),i=t("react-redux"),o=t("actions"),c=t("components/User"),u=a(c),l=function(e){var t=e.users,s=e.onChatCreate;return r["default"].createElement("div",{className:"UsersList"},t.map(function(e){return r["default"].createElement(u["default"],{username:e.username,onChatCreate:s,key:e.username})}))},d=function(e){return{users:e.users}},h=function(e){return{onChatCreate:function(t){e((0,o.createChat)(t))}}};e["default"]=(0,i.connect)(d,h)(l)}),require.register("initialize.js",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}t("style/app.scss"),t("style/custom-scrollbar.scss");var n=t("react-dom"),r=a(n),i=t("react"),o=a(i),c=t("redux"),u=t("redux-thunk"),l=a(u),d=t("react-redux");t("whatwg-fetch");var h=t("reducer"),f=a(h),p=t("container/App"),_=a(p),m=t("actions");t("es6-promise").polyfill(),t("whatwg-fetch");var g=(0,c.createStore)(f["default"],(0,c.applyMiddleware)(l["default"]));g.dispatch((0,m.initialFetchCurrentUser)()),g.dispatch((0,m.initialFetchUsers)()),g.dispatch((0,m.initialFetchChats)()),document.addEventListener("DOMContentLoaded",function(){var e=document.createElement("div");e.id="app",document.body.appendChild(e),r["default"].render(o["default"].createElement(d.Provider,{store:g},o["default"].createElement(_["default"],null)),e)})}),require.register("reducer.js",function(e,t,s){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t["default"]=e,t}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(){var e=arguments.length<=0||void 0===arguments[0]?i:arguments[0],t=arguments[1],s=void 0,a=void 0,n=void 0,o=void 0;switch(t.type){case r.SELECT_CHAT:return Object.assign({},e,{selectedChat:t.chatId});case r.ADD_NEW_CHAT_MESSAGE:return a=Object.assign({},e.messages),s=Object.assign({},e.chats),o=Object.assign({},e.chatMessagesLoadInfo),a[t.chatId]&&(n=Array.from(e.messages[t.chatId]),n.length%50===0&&(n.pop(),o[t.chatId].hasMore||(o[t.chatId].hasMore=!0)),n.unshift({text:t.message.text,sender__username:t.message.sender_username,timestamp:t.message.timestamp,is_read:!1}),a[t.chatId]=n),s[t.chatId].last_message=t.message.text,s[t.chatId].last_message_sender_id=t.message.sender_id,s[t.chatId].last_message_timestamp=t.message.timestamp,s[t.chatId].last_message_is_read=!1,Object.assign({},e,{messages:a},{chats:s},{chatMessagesLoadInfo:o});case r.READ_CHAT_MESSAGE:if(a=Object.assign({},e.messages),a[t.chatId])for(var c=a[t.chatId].length,u=0;u<c&&!a[t.chatId][u].is_read;++u)a[t.chatId][u].is_read=!0;return s=Object.assign({},e.chats),s[t.chatId].last_message_is_read=!0,Object.assign({},e,{messages:a},{chats:s});case r.CHANGE_IS_TYPING_STATE:return s=Object.assign({},e.chats),s[t.chatId].is_interlocutor_typing?s[t.chatId].is_interlocutor_typing=!1:s[t.chatId].is_interlocutor_typing=!0,Object.assign({},e,{chats:s});case r.ADD_NEW_CHAT:return s=Object.assign({},e.chats),a=Object.assign({},e.messages),o=Object.assign({},e.chatMessagesLoadInfo),s[t.chat.chat_id]=t.chat,n=[{text:t.chat.last_message,sender__username:e.currentUser.username,timestamp:t.chat.last_message_timestamp,is_read:!1}],a[t.chat.chat_id]=n,o[t.chat.chat_id]={pageNumber:1,hasMore:!1},Object.assign({},e,{chats:s},{messages:a},{chatMessagesLoadInfo:o});case r.INIT_LOAD_CHAT_MESSAGES_INFO:return o=Object.assign({},e.chatMessagesLoadInfo),o[t.chatId]={pageNumber:1},Object.assign({},e,{chatMessagesLoadInfo:o});case r.INCREMENT_CHAT_MESSAGE_PAGE_NUMBER:return o=Object.assign({},e.chatMessagesLoadInfo),o[t.chatId].pageNumber+=1,Object.assign({},e,{chatMessagesLoadInfo:o});case r.SET_HAS_MORE_CHAT_MESSAGES_VALUE:return o=Object.assign({},e.chatMessagesLoadInfo),o[t.chatId].hasMore=t.hasMore,Object.assign({},e,{chatMessagesLoadInfo:o});case r.RECEIVE_CHAT_MESSAGES:return a=Object.assign({},e.messages),a[t.chatId]?a[t.chatId]=a[t.chatId].concat(t.chatMessages):a[t.chatId]=t.chatMessages,Object.assign({},e,{messages:a});case r.RECEIVE_CURRENT_USER:return Object.assign({},e,{currentUser:t.user});case r.RECEIVE_USERS:return Object.assign({},e,{users:t.users});case r.RECEIVE_CHATS:return Object.assign({},e,{chats:t.chats});default:return e}};var n=t("utils/actionTypes"),r=a(n),i={currentUser:{},users:[{username:"first"},{username:"second"},{username:"third"}],chats:{},selectedChat:"",messages:{2:[{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"}]},chatMessagesLoadInfo:{}}}),require.register("style/app.scss.js",function(e,t,s){"use strict"}),require.register("style/custom-scrollbar.scss.js",function(e,t,s){"use strict"}),require.register("utils/actionTypes.js",function(e,t,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SELECT_CHAT="SELECT_CHAT",e.ADD_NEW_CHAT_MESSAGE="ADD_NEW_CHAT_MESSAGE",e.READ_CHAT_MESSAGE="READ_CHAT_MESSAGE",e.CHANGE_IS_TYPING_STATE="CHANGE_IS_TYPING_STATE",e.ADD_NEW_CHAT="ADD_NEW_CHAT",e.INIT_LOAD_CHAT_MESSAGES_INFO="INIT_LOAD_CHAT_MESSAGES_INFO",e.INCREMENT_CHAT_MESSAGE_PAGE_NUMBER="INCREMENT_CHAT_MESSAGE_PAGE_NUMBER",e.SET_HAS_MORE_CHAT_MESSAGES_VALUE="SET_HAS_MORE_CHAT_MESSAGES_VALUE",e.RECEIVE_CHAT_MESSAGES="RECEIVE_CHAT_MESSAGES",e.RECEIVE_CURRENT_USER="RECEIVE_CURRENT_USER",e.RECEIVE_USERS="RECEIVE_USERS",e.RECEIVE_CHATS="RECEIVE_CHATS"}),require.register("utils/apiCalls.js",function(e,t,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.loadChatMessages=e.getUserChats=e.getAllUsers=e.getCurrentUser=e.createChat=void 0;var a=t("utils/utils");e.createChat=function(e){return new Promise(function(t,s){var n=new Headers;n.append("X-CSRFToken",(0,a.getCookie)("csrftoken")),fetch("http://127.0.0.1:8000/chat/create_chat",{method:"POST",credentials:"same-origin",headers:n,body:JSON.stringify({username:e})}).then(function(e){e.json().then(function(e){return t(e)})})})},e.getCurrentUser=function(){return new Promise(function(e,t){fetch("http://127.0.0.1:8000/chat/get_current_user",{method:"GET",credentials:"same-origin"}).then(function(t){t.json().then(function(t){return e(t)})})})},e.getAllUsers=function(){return new Promise(function(e,t){fetch("http://127.0.0.1:8000/chat/get_all_users",{method:"GET",credentials:"same-origin"}).then(function(t){t.json().then(function(t){return e(t.users)})})})},e.getUserChats=function(){return new Promise(function(e,t){fetch("http://127.0.0.1:8000/chat/get_user_chats",{method:"GET",credentials:"same-origin"}).then(function(t){t.json().then(function(t){return e(t.chats)})})})},e.loadChatMessages=function(e,t){return new Promise(function(s,a){fetch("http://127.0.0.1:8000/chat/load_chat_messages/?page="+t+"&chat_id="+e,{method:"GET",credentials:"same-origin"}).then(function(e){e.json().then(function(e){return s(e)})})})}}),require.register("utils/constants.js",function(e,t,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.CHAT_ALREADY_EXISTS="CHAT_ALREADY_EXISTS",e.CHAT_NEW="CHAT_NEW",e.DISPLAY_CHAT_ON_RECIPIENT_SIDE="DISPLAY_CHAT_ON_RECIPIENT_SIDE",e.READ_MESSAGE="READ_MESSAGE",e.IS_USER_TYPING="IS_USER_TYPING",e.SEND_MESSAGE="SEND_MESSAGE"}),require.register("utils/utils.js",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0}),e.getCookie=e.getMessageTimestamp=e.compareDatesWithoutTime=e.waitForSocketConnection=void 0;var n=t("dateformat"),r=a(n);e.waitForSocketConnection=function i(e,t){setTimeout(function(){return 1===e.readyState?void(void 0!==t&&t()):void i(e,t)},5)},e.compareDatesWithoutTime=function(e,t){return e.setHours(0,0,0,0,0),t.setHours(0,0,0,0,0),e>t},e.getMessageTimestamp=function(e){var t=new Date;return t.getYear()!==e.getYear()?(0,r["default"])(e,"mmm d yyyy"):t.getDate()===e.getDate()?(0,r["default"])(e,"h:MM TT"):t.getDate()-1===e.getDate()?"yesterday":(0,r["default"])(e,"mmm d")},e.getCookie=function(e){if(document.cookie.length>0){var t=document.cookie.indexOf(e+"=");if(t!=-1){t=t+e.length+1;var s=document.cookie.indexOf(";",t);return s==-1&&(s=document.cookie.length),unescape(document.cookie.substring(t,s))}}return""}}),require.alias("buffer/index.js","buffer"),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,t,s){})}(),require("___globals___");