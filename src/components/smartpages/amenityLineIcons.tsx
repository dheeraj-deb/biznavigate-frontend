import React from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import AcUnitOutlined from "@mui/icons-material/AcUnitOutlined";
import AccessibleOutlined from "@mui/icons-material/AccessibleOutlined";
import AirportShuttleOutlined from "@mui/icons-material/AirportShuttleOutlined";
import BalconyOutlined from "@mui/icons-material/BalconyOutlined";
import BathroomOutlined from "@mui/icons-material/BathroomOutlined";
import BathtubOutlined from "@mui/icons-material/BathtubOutlined";
import BeachAccessOutlined from "@mui/icons-material/BeachAccessOutlined";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";
import CabinOutlined from "@mui/icons-material/CabinOutlined";
import CelebrationOutlined from "@mui/icons-material/CelebrationOutlined";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import CheckroomOutlined from "@mui/icons-material/CheckroomOutlined";
import CoffeeMakerOutlined from "@mui/icons-material/CoffeeMakerOutlined";
import DeskOutlined from "@mui/icons-material/DeskOutlined";
import DirectionsBikeOutlined from "@mui/icons-material/DirectionsBikeOutlined";
import ElderlyOutlined from "@mui/icons-material/ElderlyOutlined";
import ElevatorOutlined from "@mui/icons-material/ElevatorOutlined";
import EnergySavingsLeafOutlined from "@mui/icons-material/EnergySavingsLeafOutlined";
import EvStationOutlined from "@mui/icons-material/EvStationOutlined";
import FamilyRestroomOutlined from "@mui/icons-material/FamilyRestroomOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import FilterHdrOutlined from "@mui/icons-material/FilterHdrOutlined";
import FireplaceOutlined from "@mui/icons-material/FireplaceOutlined";
import FitnessCenterOutlined from "@mui/icons-material/FitnessCenterOutlined";
import ForestOutlined from "@mui/icons-material/ForestOutlined";
import GrassOutlined from "@mui/icons-material/GrassOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import HikingOutlined from "@mui/icons-material/HikingOutlined";
import HotTubOutlined from "@mui/icons-material/HotTubOutlined";
import KayakingOutlined from "@mui/icons-material/KayakingOutlined";
import KitchenOutlined from "@mui/icons-material/KitchenOutlined";
import LandscapeOutlined from "@mui/icons-material/LandscapeOutlined";
import LaptopMacOutlined from "@mui/icons-material/LaptopMacOutlined";
import LocalBarOutlined from "@mui/icons-material/LocalBarOutlined";
import LocalCafeOutlined from "@mui/icons-material/LocalCafeOutlined";
import LocalFireDepartmentOutlined from "@mui/icons-material/LocalFireDepartmentOutlined";
import LocalLaundryServiceOutlined from "@mui/icons-material/LocalLaundryServiceOutlined";
import LocalParkingOutlined from "@mui/icons-material/LocalParkingOutlined";
import LuggageOutlined from "@mui/icons-material/LuggageOutlined";
import MedicalServicesOutlined from "@mui/icons-material/MedicalServicesOutlined";
import MeetingRoomOutlined from "@mui/icons-material/MeetingRoomOutlined";
import NightsStayOutlined from "@mui/icons-material/NightsStayOutlined";
import OutdoorGrillOutlined from "@mui/icons-material/OutdoorGrillOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import PetsOutlined from "@mui/icons-material/PetsOutlined";
import PhishingOutlined from "@mui/icons-material/PhishingOutlined";
import PoolOutlined from "@mui/icons-material/PoolOutlined";
import RamenDiningOutlined from "@mui/icons-material/RamenDiningOutlined";
import RestaurantOutlined from "@mui/icons-material/RestaurantOutlined";
import RoomServiceOutlined from "@mui/icons-material/RoomServiceOutlined";
import RowingOutlined from "@mui/icons-material/RowingOutlined";
import SailingOutlined from "@mui/icons-material/SailingOutlined";
import SelfImprovementOutlined from "@mui/icons-material/SelfImprovementOutlined";
import ShowerOutlined from "@mui/icons-material/ShowerOutlined";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import SportsEsportsOutlined from "@mui/icons-material/SportsEsportsOutlined";
import SportsVolleyballOutlined from "@mui/icons-material/SportsVolleyballOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import TableRestaurantOutlined from "@mui/icons-material/TableRestaurantOutlined";
import TerrainOutlined from "@mui/icons-material/TerrainOutlined";
import TourOutlined from "@mui/icons-material/TourOutlined";
import ToysOutlined from "@mui/icons-material/ToysOutlined";
import TvOutlined from "@mui/icons-material/TvOutlined";
import UmbrellaOutlined from "@mui/icons-material/UmbrellaOutlined";
import VideocamOutlined from "@mui/icons-material/VideocamOutlined";
import VillaOutlined from "@mui/icons-material/VillaOutlined";
import WaterDropOutlined from "@mui/icons-material/WaterDropOutlined";
import WaterOutlined from "@mui/icons-material/WaterOutlined";
import WavesOutlined from "@mui/icons-material/WavesOutlined";
import WifiOutlined from "@mui/icons-material/WifiOutlined";
import WineBarOutlined from "@mui/icons-material/WineBarOutlined";
import YardOutlined from "@mui/icons-material/YardOutlined";

type Icon = React.ComponentType<SvgIconProps>;

/**
 * One line icon per label in the dashboard's amenity catalog
 * (biznavigo-frontend src/lib/amenities.ts), keyed by the lower-cased label.
 */
const EXACT: Record<string, Icon> = {
  // Setting
  beachfront: BeachAccessOutlined,
  "sea view": SailingOutlined,
  "hill view": TerrainOutlined,
  "valley view": LandscapeOutlined,
  "mountain view": FilterHdrOutlined,
  "lake view": WaterOutlined,
  "river view": WavesOutlined,
  backwater: RowingOutlined,
  "forest / jungle": ForestOutlined,
  "tea / coffee estate": LocalCafeOutlined,
  "waterfall nearby": WaterDropOutlined,
  treehouse: CabinOutlined,
  "eco / sustainable": EnergySavingsLeafOutlined,
  "quiet location": NightsStayOutlined,
  // Great for
  "couples / honeymoon": FavoriteBorderOutlined,
  "families with kids": FamilyRestroomOutlined,
  "friends & groups": GroupsOutlined,
  "corporate / team outings": BusinessCenterOutlined,
  workation: LaptopMacOutlined,
  "senior-friendly": ElderlyOutlined,
  "solo travellers": PersonOutlined,
  "private / whole-property stays": VillaOutlined,
  "pets on request": PetsOutlined,
  // Essentials
  "wi-fi": WifiOutlined,
  "free parking": LocalParkingOutlined,
  "power backup": BoltOutlined,
  restaurant: RestaurantOutlined,
  "room service": RoomServiceOutlined,
  "24-hour front desk": SupportAgentOutlined,
  laundry: LocalLaundryServiceOutlined,
  lift: ElevatorOutlined,
  cctv: VideocamOutlined,
  // Pool & wellness
  "ayurveda / massage": SpaOutlined,
  spa: SpaOutlined,
  yoga: SelfImprovementOutlined,
  gym: FitnessCenterOutlined,
  "steam / sauna": HotTubOutlined,
  // Outdoors & activities
  "bonfire / campfire": LocalFireDepartmentOutlined,
  "kids play area": ToysOutlined,
  garden: YardOutlined,
  "indoor games": SportsEsportsOutlined,
  "outdoor games": SportsVolleyballOutlined,
  "trekking / nature walk": HikingOutlined,
  "plantation walk": GrassOutlined,
  cycling: DirectionsBikeOutlined,
  fishing: PhishingOutlined,
  "boating / kayaking": KayakingOutlined,
  "rain dance": UmbrellaOutlined,
  // Food & drink
  "pure veg kitchen": EnergySavingsLeafOutlined,
  "local cuisine": RamenDiningOutlined,
  bar: LocalBarOutlined,
  "coffee shop": LocalCafeOutlined,
  bbq: OutdoorGrillOutlined,
  // Groups & celebrations
  "banquet / event hall": TableRestaurantOutlined,
  "conference room": MeetingRoomOutlined,
  "celebration decoration": CelebrationOutlined,
  "candlelight dinner": WineBarOutlined,
  // Getting here & services
  "airport / railway pickup": AirportShuttleOutlined,
  "travel desk / sightseeing": TourOutlined,
  "doctor on call": MedicalServicesOutlined,
  "ev charging": EvStationOutlined,
  "wheelchair accessible": AccessibleOutlined,
  "luggage storage": LuggageOutlined,
  // In the room
  "air conditioning": AcUnitOutlined,
  "attached bathroom": BathroomOutlined,
  "hot water": ShowerOutlined,
  tv: TvOutlined,
  balcony: BalconyOutlined,
  kettle: CoffeeMakerOutlined,
  "mini fridge": KitchenOutlined,
  "work desk": DeskOutlined,
  wardrobe: CheckroomOutlined,
  "room heater": FireplaceOutlined,
  bathtub: BathtubOutlined,
};

/** Owner-typed labels outside the catalog: first keyword that appears wins. */
const KEYWORDS: [string, Icon][] = [
  ["pool", PoolOutlined],
  ["wifi", WifiOutlined],
  ["parking", LocalParkingOutlined],
  ["breakfast", LocalCafeOutlined],
  ["restaurant", RestaurantOutlined],
  ["dining", RestaurantOutlined],
  ["spa", SpaOutlined],
  ["massage", SpaOutlined],
  ["gym", FitnessCenterOutlined],
  ["view", LandscapeOutlined],
  ["garden", YardOutlined],
  ["pet", PetsOutlined],
  ["kids", ToysOutlined],
  ["bonfire", LocalFireDepartmentOutlined],
  ["campfire", LocalFireDepartmentOutlined],
  ["trek", HikingOutlined],
  ["walk", HikingOutlined],
  ["bar", LocalBarOutlined],
  ["coffee", LocalCafeOutlined],
  ["tea", LocalCafeOutlined],
  ["pickup", AirportShuttleOutlined],
  ["bath", BathtubOutlined],
];

export function amenityLineIcon(name: string): Icon {
  const key = name.trim().toLowerCase();
  return EXACT[key] ?? KEYWORDS.find(([k]) => key.includes(k))?.[1] ?? CheckOutlined;
}

export function AmenityLineIcon({ name, size = 24, color }: { name: string; size?: number; color?: string }) {
  // A lookup into static maps, not a component defined during render.
  return React.createElement(amenityLineIcon(name), { sx: { fontSize: size, color } });
}
