'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(_reactRouter2.default, { handler: _App2.default });

_reactRouter2.default.run(routes, _reactRouter2.default.HistoryLocation, function (Root) {
     _react2.default.render(_react2.default.createElement(Root, null), document.getElementById('app'));
});