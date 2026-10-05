// Group sizing on the booking page. Run with `npm test` (node --test, which
// loads the .ts source directly by stripping its types — no bundler, no jest).
//
// The bug these pin: a WhatsApp guest quoted "Garden Deluxe Room ₹18,600 for
// 1 night (3 rooms for your party)" followed the link to a page where every
// room read "Too small" and nothing could be booked.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  alternativeLabel,
  arrangementLabel,
  arrangementsFor,
  checkoutArrangement,
  parseBeds,
  surchargeFor,
  checkoutRoomCount,
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

// Extra beds: three adults in a room for two, or four friends sharing one.
// What the API returns for three adults and a room that takes extra beds.
const bedded = {
  available: true,
  availableRooms: 4,
  totalPrice: 6200,
  occupancySurcharge: 0,
  fitsParty: false,
  roomsNeeded: 2,
  enoughRoomsAvailable: true,
  totalPriceForParty: 12400,
  extraBedOption: { rooms: 1, extraBeds: 1, occupancySurcharge: 0, extraBedCharge: 1000, totalPriceForParty: 7200 },
};

test("both ways to stay are offered, the cheaper first", () => {
  assert.deepEqual(arrangementsFor(bedded), [
    { rooms: 1, extraBeds: 1, total: 7200 },
    { rooms: 2, extraBeds: 0, total: 12400 },
  ]);
  assert.equal(stayTotal(bedded), 7200);
  assert.equal(arrangementLabel({ rooms: 1, extraBeds: 1 }), "1 room + 1 extra bed");
  assert.equal(arrangementLabel({ rooms: 1, extraBeds: 2 }), "1 room + 2 extra beds");
  assert.equal(alternativeLabel({ rooms: 2, extraBeds: 0 }), "2 separate rooms");
});

test("one room with a bed is still bookable when two rooms are not free", () => {
  const lastRoom = { ...bedded, availableRooms: 1, enoughRoomsAvailable: false };
  assert.equal(isBookable(lastRoom), true);
  assert.equal(tooFewRoomsLeft(lastRoom), false);
  assert.deepEqual(arrangementsFor(lastRoom), [{ rooms: 1, extraBeds: 1, total: 7200 }]);
});

test("checkout opens on what the link carried, else the cheaper way", () => {
  assert.deepEqual(checkoutArrangement(bedded, { beds: 1 }), { rooms: 1, extraBeds: 1, total: 7200 });
  // A room count alone means separate rooms.
  assert.deepEqual(checkoutArrangement(bedded, { rooms: 2 }), { rooms: 2, extraBeds: 0, total: 12400 });
  // beds=0 is the guest choosing separate rooms on purpose.
  assert.deepEqual(checkoutArrangement(bedded, { beds: 0 }), { rooms: 2, extraBeds: 0, total: 12400 });
  assert.deepEqual(checkoutArrangement(bedded, {}), { rooms: 1, extraBeds: 1, total: 7200 });
  // Beds asked for on a room that offers none: the rooms it does offer.
  assert.deepEqual(checkoutArrangement(garden, { beds: 1 }), { rooms: 3, extraBeds: 0, total: 18600 });
  assert.equal(checkoutArrangement({ ...garden, available: false }, {}), null);
});

test("the extra-guest note follows the arrangement shown", () => {
  const withSurcharge = { ...bedded, occupancySurcharge: 900, extraBedOption: { ...bedded.extraBedOption, occupancySurcharge: 0 } };
  assert.equal(surchargeFor(withSurcharge, { rooms: 1, extraBeds: 1, total: 7200 }), 0);
  assert.equal(surchargeFor(withSurcharge, { rooms: 2, extraBeds: 0, total: 12400 }), 900);
});

test("the beds URL param takes only a sane count, and 0 means separate rooms", () => {
  assert.equal(parseBeds("2"), 2);
  assert.equal(parseBeds("0"), 0);
  assert.equal(parseBeds(null), null);
  assert.equal(parseBeds(""), null);
  assert.equal(parseBeds("-1"), null);
  assert.equal(parseBeds("1.5"), null);
});
