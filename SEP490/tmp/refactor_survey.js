const fs = require('fs');

const path = 'd:/Works/PJ/SP26/SEP490/HOMS_FE/src/pages/DispatcherPage/SurveyInput/SurveyInput.jsx';
let text = fs.readFileSync(path, 'utf8');

const getMatch = (regex) => {
    const match = text.match(regex);
    return match ? match[0] : '';
};

const catIcon = getMatch(/\/\/ ─── Icon badge helper[\s\S]*?const CatIcon =[\s\S]*?\);\n/);
const primary = getMatch(/\/\/ ─── PRIMARY FURNITURE CATALOG[\s\S]*?const PRIMARY_CATALOG = \[[\s\S]*?\];\n/);
const secondary = getMatch(/\/\/ ─── SECONDARY \/ MISC CATALOG[\s\S]*?const SECONDARY_CATALOG = \[[\s\S]*?\];\n/);
const qty = getMatch(/\/\/ Quantity tiers for secondary items[\s\S]*?const QTY_TIERS = \[[\s\S]*?\];\n/);
const critical = getMatch(/\/\/ ─── CRITICAL ITEMS[\s\S]*?const CRITICAL_ITEMS = \[[\s\S]*?\];\n/);

const constantsCode = import {
  FaBed, FaTv, FaCouch, FaMotorcycle, FaSnowflake,
  FaBoxOpen, FaBook, FaGuitar, FaTshirt, FaWineGlass
} from 'react-icons/fa';
import {
  GiWashingMachine, GiCloakDagger, GiMirrorMirror,
  GiCookingPot, GiSofa, GiClosedDoors, GiHandheldFan,
  GiDirectorChair, GiWoodBeam, GiStrongbox, GiStrong
} from 'react-icons/gi';
import {
  MdComputer, MdAir, MdTv, MdChair, MdOutlineDiamond,
  MdLightbulbOutline, MdAccessTime, MdLocalFlorist,
  MdCurtains, MdToys, MdOutdoorGrill, MdSoap,
  MdOutlineTableRestaurant, MdBookmarks
} from 'react-icons/md';
import { TbFridge, TbArmchair, TbShoe, TbShoeOff } from 'react-icons/tb';
import { PiScrollDuotone } from 'react-icons/pi';





;

const catIconCode = import React from 'react';


;

fs.writeFileSync('d:/Works/PJ/SP26/SEP490/HOMS_FE/src/pages/DispatcherPage/SurveyInput/components/constants.js', constantsCode);
fs.writeFileSync('d:/Works/PJ/SP26/SEP490/HOMS_FE/src/pages/DispatcherPage/SurveyInput/components/CatIcon.jsx', catIconCode);

text = text.replace(catIcon, '');
text = text.replace(primary, '');
text = text.replace(secondary, '');
text = text.replace(qty, '');
text = text.replace(critical, '');

const importStr = import { CatIcon } from './components/CatIcon';\nimport { PRIMARY_CATALOG, SECONDARY_CATALOG, QTY_TIERS, CRITICAL_ITEMS } from './components/constants';\n;
text = text.replace("import { normalizeAIItems", importStr + "import { normalizeAIItems");

fs.writeFileSync(path, text);
