"use strict";

// This module exports a utility function for simulating delay

function someMilliseconds() {
  return Math.floor(Math.random() * 400) + 100;
}

module.exports = function simulateDelay(callback) {
  setTimeout(callback, someMilliseconds());
}

