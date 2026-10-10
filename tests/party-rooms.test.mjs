// Group sizing on the booking page. Run with `npm test` (node --test, which
// loads the .ts source directly by stripping its types — no bundler, no jest).
//
// The bug these pin: a WhatsApp guest quoted "Garden Deluxe Room ₹18,600 for
// 1 night (3 rooms for your party)" followed the link to a page where every
// room read "Too small" and nothing could be booked.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  bookableInRooms,
  checkoutRoomCount,
  extraBedsFor,
  extraBedsLabel,
  parseBeds,
  groupRoomsLabel,
  isBookable,
  parseRooms,
  roomsForParty,
  stayTotal,
  tooFewRoomsLeft,
} from "../src/lib/party-rooms.ts";

// What the API returns for five adults and a room that sleeps two.
const garden = {
  available: true,
  availableRooms: 4,
  totalPrice: 6200,
  occupancySurcharge: 0,
  fitsParty: false,
  roomsNeeded: 3,
  enoughRoomsAvailable: true,
  totalPriceForParty: 18600,
};

test("a room one unit of which is too small is bookable as several", () => {
  assert.equal(isBookable(garden), true);
  assert.equal(roomsForParty(garden), 3);
  assert.equal(groupRoomsLabel(roomsForParty(garden)), "3 rooms for your group");
});

test("the card shows the chat's group total, not one room's price", () => {
  assert.equal(stayTotal(garden), 18600);
  // A single room, or an API that predates group sizing: room + extra guests.
  assert.equal(stayTotal({ totalPrice: 6200, occupancySurcharge: 800 }), 7000);
});

test("too few rooms left is not bookable, and is not 'too small'", () => {
  const short = { ...garden, availableRooms: 2, enoughRoomsAvailable: false, totalPriceForParty: undefined };
  assert.equal(isBookable(short), false);
  assert.equal(tooFewRoomsLeft(short), true);
});

test("a type the group can't take at all stays too small", () => {
  const adultsOnly = { ...garden, roomsNeeded: 1, enoughRoomsAvailable: false };
  assert.equal(isBookable(adultsOnly), false);
  assert.equal(tooFewRoomsLeft(adultsOnly), false);
});

test("sold out is never bookable, whatever the sizing says", () => {
  assert.equal(isBookable({ ...garden, available: false }), false);
});

test("an older API with no group sizing keeps the one-room rule", () => {
  assert.equal(isBookable({ available: true, fitsParty: false }), false);
  assert.equal(isBookable({ available: true, fitsParty: true }), true);
  assert.equal(isBookable({ available: true }), true);
  assert.equal(roomsForParty({}), 1);
  assert.equal(groupRoomsLabel(1), null);
});

test("checkout opens at the count the WhatsApp link carried", () => {
  assert.equal(checkoutRoomCount(garden, 3), 3);
  assert.equal(checkoutRoomCount(garden, null), 3);
  // More rooms than the group needs, if they are free.
  assert.equal(checkoutRoomCount(garden, 4), 4);
});

test("checkout never opens at fewer rooms than the group needs, or more than are free", () => {
  assert.equal(checkoutRoomCount(garden, 1), 3);
  assert.equal(checkoutRoomCount(garden, 9), 4);
  assert.equal(checkoutRoomCount({ roomsNeeded: 1, availableRooms: 5 }, undefined), 1);
});

test("the rooms URL param takes only a sane count", () => {
  assert.equal(parseRooms("3"), 3);
  assert.equal(parseRooms(null), null);
  assert.equal(parseRooms(""), null);
  assert.equal(parseRooms("0"), null);
  assert.equal(parseRooms("2.5"), null);
  assert.equal(parseRooms("abc"), null);
  assert.equal(parseRooms("999"), null);
});

// Audit F11 (2026-10-09): a family of four was quoted two Garden Deluxe rooms
// at ₹29,820; one room with an extra bed was never offered. What the API now
// returns for that party.
const gardenFamily = {
  available: true,
  availableRooms: 4,
  totalPrice: 12400,
  occupancySurcharge: 0,
  fitsParty: false,
  roomsNeeded: 2,
  enoughRoomsAvailable: true,
  totalPriceForParty: 25270,
  oneRoomWithExtraBeds: { extraBeds: 1, totalPriceForParty: 18400 },
};

test("keeps the several-room stay unless the link asked for the bed", () => {
  assert.equal(extraBedsFor(gardenFamily), 0);
  assert.equal(stayTotal(gardenFamily, 0), 25270);
  assert.equal(roomsForParty(gardenFamily, 0), 2);
});

test("books one room with the bed the WhatsApp card offered", () => {
  const beds = extraBedsFor(gardenFamily, { beds: 1 });
  assert.equal(beds, 1);
  assert.equal(stayTotal(gardenFamily, beds), 18400);
  assert.equal(roomsForParty(gardenFamily, beds), 1);
  assert.equal(checkoutRoomCount(gardenFamily, null, beds), 1);
  assert.equal(extraBedsLabel(beds), "1 room + 1 extra bed");
});

test("several rooms asked for win over the bed", () => {
  assert.equal(extraBedsFor(gardenFamily, { beds: 1, rooms: 2 }), 0);
});

test("one room with beds is the stay when too few rooms are left for several", () => {
  const lastRoom = { ...gardenFamily, availableRooms: 1, enoughRoomsAvailable: false };
  assert.equal(bookableInRooms(lastRoom), false);
  assert.equal(isBookable(lastRoom), true);
  assert.equal(extraBedsFor(lastRoom), 1);
  assert.equal(tooFewRoomsLeft(lastRoom), false);
});

test("reads the beds param only as a sane count", () => {
  assert.equal(parseBeds("1"), 1);
  assert.equal(parseBeds("0"), null);
  assert.equal(parseBeds("x"), null);
  assert.equal(parseBeds(null), null);
});
