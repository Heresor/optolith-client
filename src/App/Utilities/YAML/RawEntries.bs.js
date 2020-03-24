// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function aspectL10n(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function fromYaml(yaml) {
  return Json_decode.list(aspectL10n, yaml.aspectsL10n);
}

var AspectsL10n = {
  fromYaml: fromYaml
};

function experienceLevelL10n(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          name: Json_decode.field("name", Json_decode.string, json)
        };
}

function fromYaml$1(yaml) {
  return Json_decode.list(experienceLevelL10n, yaml.experienceLevelsL10n);
}

var ExperienceLevelsL10n = {
  fromYaml: fromYaml$1
};

function experienceLevelUniv(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          ap: Json_decode.field("ap", Json_decode.$$int, json),
          maxAttributeValue: Json_decode.field("maxAttributeValue", Json_decode.$$int, json),
          maxSkillRating: Json_decode.field("maxSkillRating", Json_decode.$$int, json),
          maxCombatTechniqueRating: Json_decode.field("maxCombatTechniqueRating", Json_decode.$$int, json),
          maxTotalAttributeValues: Json_decode.field("maxTotalAttributeValues", Json_decode.$$int, json),
          maxSpellsLiturgicalChants: Json_decode.field("maxSpellsLiturgicalChants", Json_decode.$$int, json),
          maxUnfamiliarSpells: Json_decode.field("maxUnfamiliarSpells", Json_decode.$$int, json)
        };
}

function fromYaml$2(yaml) {
  return Json_decode.list(experienceLevelUniv, yaml.experienceLevelsUniv);
}

var ExperienceLevelsUniv = {
  fromYaml: fromYaml$2
};

exports.AspectsL10n = AspectsL10n;
exports.ExperienceLevelsL10n = ExperienceLevelsL10n;
exports.ExperienceLevelsUniv = ExperienceLevelsUniv;
/* No side effect */
