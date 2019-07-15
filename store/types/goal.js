// store
import {FaFrown, FaGrinAlt, FaGrinBeam, FaMeh, FaSmile} from "react-icons/fa";

export const RESET_SELECTED_GOAL = 'RESET__SELECTED_GOAL';
export const ASSIGN_SELECTED_GOAL = 'ASSIGN_SELECTED_GOAL';
export const ASSIGN_GOALS = 'ASSIGN_GOALS';
export const DELETE_GOAL = 'DELETE_GOAL';

export const GOAL_TYPE = {
  QUALITATIVE: 'qualitative',
  COUNT: 'count',
  BOOLEAN: 'boolean'
};

export const GOAL_QUALITATIVE_ICONS = {
  1: FaFrown,
  2: FaMeh,
  3: FaSmile,
  4: FaGrinAlt,
  5: FaGrinBeam
};

export const GOAL_QUALITATIVE_ICONS_CLASS_NAMES = {
  1: "text-yellow-400",
  2: "text-yellow-500",
  3: "text-blue-500",
  4: "text-green-500",
  5: "text-green-600"
};

