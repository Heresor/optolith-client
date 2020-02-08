/* eslint "@typescript-eslint/type-annotation-spacing": [2, { "before": true, "after": true }] */
import { bindF, Right, second } from "../../../../Data/Either"
import { List } from "../../../../Data/List"
import { Maybe, Nothing } from "../../../../Data/Maybe"
import { fromMap } from "../../../../Data/OrderedMap"
import { Record } from "../../../../Data/Record"
import { MagicalGroup, MagicalTradition } from "../../../Constants/Groups"
import { Spell } from "../../../Models/Wiki/Spell"
import { icToInt } from "../../AdventurePoints/improvementCostUtils"
import { ndash } from "../../Chars"
import { pipe } from "../../pipe"
import { mapM } from "../Either"
import { toMapIntegrity } from "../EntityIntegrity"
import { CurseL10n } from "../Schema/Curses/Curses.l10n"
import { CurseUniv } from "../Schema/Curses/Curses.univ"
import { YamlNameMap } from "../SchemaMap"
import { YamlFileConverter, YamlPairConverterE } from "../ToRecordsByFile"
import { zipBy } from "../ZipById"
import { toErrata } from "./toErrata"
import { toMarkdown } from "./ToMarkdown"
import { toSourceRefs } from "./ToSourceRefs"


const toCurse : YamlPairConverterE<CurseUniv, CurseL10n, string, Spell>
              = ([ univ, l10n ]) => Right<[string, Record<Spell>]> ([
                    univ.id,
                    Spell ({
                      id: univ .id,
                      name: l10n.name,
                      check: List (univ.check1, univ.check2, univ.check3),
                      checkmod: Maybe (univ.checkMod),
                      gr: MagicalGroup.Curses,
                      ic: icToInt ("B"),
                      property: univ.property,
                      tradition: List (MagicalTradition.Witches),
                      subtradition: List (),
                      prerequisites: List (),
                      effect: toMarkdown (l10n.effect),
                      castingTime: ndash,
                      castingTimeShort: ndash,
                      castingTimeNoMod: false,
                      cost: l10n.aeCost,
                      costShort: l10n.aeCostShort,
                      costNoMod: false,
                      range: ndash,
                      rangeShort: ndash,
                      rangeNoMod: false,
                      duration: l10n.duration,
                      durationShort: l10n.durationShort,
                      durationNoMod: false,
                      target: ndash,
                      src: toSourceRefs (l10n.src),
                      errata: toErrata (l10n.errata),
                      category: Nothing,
                    }),
                  ])


export const toCurses : YamlFileConverter<string, Record<Spell>>
                      = pipe (
                          (yaml_mp : YamlNameMap) => zipBy ("id")
                                                           (yaml_mp.CursesUniv)
                                                           (yaml_mp.CursesL10n),
                          bindF (pipe (
                            mapM (toCurse),
                            bindF (toMapIntegrity),
                          )),
                          second (fromMap)
                        )
