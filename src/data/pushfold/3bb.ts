import HintTable from 'domain/hintTable'
import Position from 'domain/position'

export const sb: HintTable = [
  [
    /*AA */ true,
    /*AKs*/ true,
    /*AQs*/ true,
    /*AJs*/ true,
    /*ATs*/ true,
    /*A9s*/ true,
    /*A8s*/ true,
    /*A7s*/ true,
    /*A6s*/ true,
    /*A5s*/ true,
    /*A4s*/ true,
    /*A3s*/ true,
    /*A2s*/ true,
  ],
  [
    /*AKo*/ true,
    /*KK */ true,
    /*KQs*/ true,
    /*KJs*/ true,
    /*KTs*/ true,
    /*K9s*/ true,
    /*K8s*/ true,
    /*K7s*/ true,
    /*K6s*/ true,
    /*K5s*/ true,
    /*K4s*/ true,
    /*K3s*/ true,
    /*K2s*/ true,
  ],
  [
    /*AQo*/ true,
    /*KQo*/ true,
    /*QQ */ true,
    /*QJs*/ true,
    /*QTs*/ true,
    /*Q9s*/ true,
    /*Q8s*/ true,
    /*Q7s*/ true,
    /*Q6s*/ true,
    /*Q5s*/ true,
    /*Q4s*/ true,
    /*Q3s*/ true,
    /*Q2s*/ true,
  ],
  [
    /*AJo*/ true,
    /*KJo*/ true,
    /*QJo*/ true,
    /*JJ */ true,
    /*JTs*/ true,
    /*J9s*/ true,
    /*J8s*/ true,
    /*J7s*/ true,
    /*J6s*/ true,
    /*J5s*/ true,
    /*J4s*/ true,
    /*J3s*/ true,
    /*J2s*/ true,
  ],
  [
    /*ATo*/ true,
    /*KTo*/ true,
    /*QTo*/ true,
    /*JTo*/ true,
    /*TT */ true,
    /*T9s*/ true,
    /*T8s*/ true,
    /*T7s*/ true,
    /*T6s*/ true,
    /*T5s*/ true,
    /*T4s*/ true,
    /*T3s*/ true,
    /*T2s*/ true,
  ],
  [
    /*A9o*/ true,
    /*K9o*/ true,
    /*Q9o*/ true,
    /*J9o*/ true,
    /*T9o*/ true,
    /*99 */ true,
    /*98s*/ true,
    /*97s*/ true,
    /*96s*/ true,
    /*95s*/ true,
    /*94s*/ true,
    /*93s*/ true,
    /*92s*/ true,
  ],
  [
    /*A8o*/ true,
    /*K8o*/ true,
    /*Q8o*/ true,
    /*J8o*/ true,
    /*T8o*/ true,
    /*98o*/ true,
    /*88 */ true,
    /*87s*/ true,
    /*86s*/ true,
    /*85s*/ true,
    /*84s*/ true,
    /*83s*/ true,
    /*82s*/ true,
  ],
  [
    /*A7o*/ true,
    /*K7o*/ true,
    /*Q7o*/ true,
    /*J7o*/ true,
    /*T7o*/ true,
    /*97o*/ true,
    /*87o*/ true,
    /*77 */ true,
    /*76s*/ true,
    /*75s*/ true,
    /*74s*/ true,
    /*73s*/ true,
    /*72s*/ true,
  ],
  [
    /*A6o*/ true,
    /*K6o*/ true,
    /*Q6o*/ true,
    /*J6o*/ true,
    /*T6o*/ true,
    /*96o*/ true,
    /*86o*/ true,
    /*76o*/ true,
    /*66 */ true,
    /*65s*/ true,
    /*64s*/ true,
    /*63s*/ true,
    /*62s*/ true,
  ],
  [
    /*A5o*/ true,
    /*K5o*/ true,
    /*Q5o*/ true,
    /*J5o*/ true,
    /*T5o*/ true,
    /*95o*/ true,
    /*85o*/ true,
    /*75o*/ true,
    /*65o*/ true,
    /*55 */ true,
    /*54s*/ true,
    /*53s*/ true,
    /*52s*/ true,
  ],
  [
    /*A4o*/ true,
    /*K4o*/ true,
    /*Q4o*/ true,
    /*J4o*/ true,
    /*T4o*/ true,
    /*94o*/ true,
    /*84o*/ true,
    /*74o*/ true,
    /*64o*/ true,
    /*54o*/ true,
    /*44 */ true,
    /*43s*/ true,
    /*42s*/ true,
  ],
  [
    /*A3o*/ true,
    /*K3o*/ true,
    /*Q3o*/ true,
    /*J3o*/ true,
    /*T3o*/ true,
    /*93o*/ true,
    /*83o*/ true,
    /*73o*/ true,
    /*63o*/ true,
    /*53o*/ true,
    /*43o*/ false,
    /*33 */ true,
    /*32s*/ true,
  ],
  [
    /*A2o*/ true,
    /*K2o*/ true,
    /*Q2o*/ true,
    /*J2o*/ true,
    /*T2o*/ true,
    /*92o*/ true,
    /*82o*/ true,
    /*72o*/ false,
    /*62o*/ false,
    /*52o*/ false,
    /*42o*/ false,
    /*32o*/ false,
    /*22 */ true,
  ],
]

export const button: HintTable = [
  [
    /*AA */ true,
    /*AKs*/ true,
    /*AQs*/ true,
    /*AJs*/ true,
    /*ATs*/ true,
    /*A9s*/ true,
    /*A8s*/ true,
    /*A7s*/ true,
    /*A6s*/ true,
    /*A5s*/ true,
    /*A4s*/ true,
    /*A3s*/ true,
    /*A2s*/ true,
  ],
  [
    /*AKo*/ true,
    /*KK */ true,
    /*KQs*/ true,
    /*KJs*/ true,
    /*KTs*/ true,
    /*K9s*/ true,
    /*K8s*/ true,
    /*K7s*/ true,
    /*K6s*/ true,
    /*K5s*/ true,
    /*K4s*/ true,
    /*K3s*/ true,
    /*K2s*/ true,
  ],
  [
    /*AQo*/ true,
    /*KQo*/ true,
    /*QQ */ true,
    /*QJs*/ true,
    /*QTs*/ true,
    /*Q9s*/ true,
    /*Q8s*/ true,
    /*Q7s*/ true,
    /*Q6s*/ true,
    /*Q5s*/ true,
    /*Q4s*/ true,
    /*Q3s*/ true,
    /*Q2s*/ true,
  ],
  [
    /*AJo*/ true,
    /*KJo*/ true,
    /*QJo*/ true,
    /*JJ */ true,
    /*JTs*/ true,
    /*J9s*/ true,
    /*J8s*/ true,
    /*J7s*/ true,
    /*J6s*/ true,
    /*J5s*/ true,
    /*J4s*/ true,
    /*J3s*/ true,
    /*J2s*/ true,
  ],
  [
    /*ATo*/ true,
    /*KTo*/ true,
    /*QTo*/ true,
    /*JTo*/ true,
    /*TT */ true,
    /*T9s*/ true,
    /*T8s*/ true,
    /*T7s*/ true,
    /*T6s*/ true,
    /*T5s*/ true,
    /*T4s*/ true,
    /*T3s*/ true,
    /*T2s*/ false,
  ],
  [
    /*A9o*/ true,
    /*K9o*/ true,
    /*Q9o*/ true,
    /*J9o*/ true,
    /*T9o*/ true,
    /*99 */ true,
    /*98s*/ true,
    /*97s*/ true,
    /*96s*/ true,
    /*95s*/ true,
    /*94s*/ false,
    /*93s*/ false,
    /*92s*/ false,
  ],
  [
    /*A8o*/ true,
    /*K8o*/ true,
    /*Q8o*/ true,
    /*J8o*/ true,
    /*T8o*/ true,
    /*98o*/ true,
    /*88 */ true,
    /*87s*/ true,
    /*86s*/ true,
    /*85s*/ true,
    /*84s*/ false,
    /*83s*/ false,
    /*82s*/ false,
  ],
  [
    /*A7o*/ true,
    /*K7o*/ true,
    /*Q7o*/ true,
    /*J7o*/ true,
    /*T7o*/ true,
    /*97o*/ true,
    /*87o*/ true,
    /*77 */ true,
    /*76s*/ true,
    /*75s*/ true,
    /*74s*/ false,
    /*73s*/ false,
    /*72s*/ false,
  ],
  [
    /*A6o*/ true,
    /*K6o*/ true,
    /*Q6o*/ true,
    /*J6o*/ true,
    /*T6o*/ true,
    /*96o*/ false,
    /*86o*/ false,
    /*76o*/ false,
    /*66 */ true,
    /*65s*/ true,
    /*64s*/ false,
    /*63s*/ false,
    /*62s*/ false,
  ],
  [
    /*A5o*/ true,
    /*K5o*/ true,
    /*Q5o*/ true,
    /*J5o*/ true,
    /*T5o*/ false,
    /*95o*/ false,
    /*85o*/ false,
    /*75o*/ false,
    /*65o*/ false,
    /*55 */ true,
    /*54s*/ true,
    /*53s*/ false,
    /*52s*/ false,
  ],
  [
    /*A4o*/ true,
    /*K4o*/ true,
    /*Q4o*/ true,
    /*J4o*/ false,
    /*T4o*/ false,
    /*94o*/ false,
    /*84o*/ false,
    /*74o*/ false,
    /*64o*/ false,
    /*54o*/ false,
    /*44 */ true,
    /*43s*/ false,
    /*42s*/ false,
  ],
  [
    /*A3o*/ true,
    /*K3o*/ true,
    /*Q3o*/ true,
    /*J3o*/ false,
    /*T3o*/ false,
    /*93o*/ false,
    /*83o*/ false,
    /*73o*/ false,
    /*63o*/ false,
    /*53o*/ false,
    /*43o*/ false,
    /*33 */ true,
    /*32s*/ false,
  ],
  [
    /*A2o*/ true,
    /*K2o*/ true,
    /*Q2o*/ true,
    /*J2o*/ false,
    /*T2o*/ false,
    /*92o*/ false,
    /*82o*/ false,
    /*72o*/ false,
    /*62o*/ false,
    /*52o*/ false,
    /*42o*/ false,
    /*32o*/ false,
    /*22 */ true,
  ],
]

export const co: HintTable = [
  [
    /*AA */ true,
    /*AKs*/ true,
    /*AQs*/ true,
    /*AJs*/ true,
    /*ATs*/ true,
    /*A9s*/ true,
    /*A8s*/ true,
    /*A7s*/ true,
    /*A6s*/ true,
    /*A5s*/ true,
    /*A4s*/ true,
    /*A3s*/ true,
    /*A2s*/ true,
  ],
  [
    /*AKo*/ true,
    /*KK */ true,
    /*KQs*/ true,
    /*KJs*/ true,
    /*KTs*/ true,
    /*K9s*/ true,
    /*K8s*/ true,
    /*K7s*/ true,
    /*K6s*/ true,
    /*K5s*/ true,
    /*K4s*/ true,
    /*K3s*/ true,
    /*K2s*/ true,
  ],
  [
    /*AQo*/ true,
    /*KQo*/ true,
    /*QQ */ true,
    /*QJs*/ true,
    /*QTs*/ true,
    /*Q9s*/ true,
    /*Q8s*/ true,
    /*Q7s*/ true,
    /*Q6s*/ true,
    /*Q5s*/ true,
    /*Q4s*/ true,
    /*Q3s*/ true,
    /*Q2s*/ true,
  ],
  [
    /*AJo*/ true,
    /*KJo*/ true,
    /*QJo*/ true,
    /*JJ */ true,
    /*JTs*/ true,
    /*J9s*/ true,
    /*J8s*/ true,
    /*J7s*/ true,
    /*J6s*/ true,
    /*J5s*/ true,
    /*J4s*/ true,
    /*J3s*/ true,
    /*J2s*/ false,
  ],
  [
    /*ATo*/ true,
    /*KTo*/ true,
    /*QTo*/ true,
    /*JTo*/ true,
    /*TT */ true,
    /*T9s*/ true,
    /*T8s*/ true,
    /*T7s*/ true,
    /*T6s*/ true,
    /*T5s*/ true,
    /*T4s*/ false,
    /*T3s*/ false,
    /*T2s*/ false,
  ],
  [
    /*A9o*/ true,
    /*K9o*/ true,
    /*Q9o*/ true,
    /*J9o*/ true,
    /*T9o*/ true,
    /*99 */ true,
    /*98s*/ true,
    /*97s*/ true,
    /*96s*/ true,
    /*95s*/ true,
    /*94s*/ false,
    /*93s*/ false,
    /*92s*/ false,
  ],
  [
    /*A8o*/ true,
    /*K8o*/ true,
    /*Q8o*/ true,
    /*J8o*/ true,
    /*T8o*/ true,
    /*98o*/ true,
    /*88 */ true,
    /*87s*/ true,
    /*86s*/ true,
    /*85s*/ true,
    /*84s*/ false,
    /*83s*/ false,
    /*82s*/ false,
  ],
  [
    /*A7o*/ true,
    /*K7o*/ true,
    /*Q7o*/ true,
    /*J7o*/ true,
    /*T7o*/ false,
    /*97o*/ false,
    /*87o*/ false,
    /*77 */ true,
    /*76s*/ true,
    /*75s*/ true,
    /*74s*/ false,
    /*73s*/ false,
    /*72s*/ false,
  ],
  [
    /*A6o*/ true,
    /*K6o*/ true,
    /*Q6o*/ true,
    /*J6o*/ false,
    /*T6o*/ false,
    /*96o*/ false,
    /*86o*/ false,
    /*76o*/ false,
    /*66 */ true,
    /*65s*/ true,
    /*64s*/ false,
    /*63s*/ false,
    /*62s*/ false,
  ],
  [
    /*A5o*/ true,
    /*K5o*/ true,
    /*Q5o*/ true,
    /*J5o*/ false,
    /*T5o*/ false,
    /*95o*/ false,
    /*85o*/ false,
    /*75o*/ false,
    /*65o*/ false,
    /*55 */ true,
    /*54s*/ false,
    /*53s*/ false,
    /*52s*/ false,
  ],
  [
    /*A4o*/ true,
    /*K4o*/ true,
    /*Q4o*/ false,
    /*J4o*/ false,
    /*T4o*/ false,
    /*94o*/ false,
    /*84o*/ false,
    /*74o*/ false,
    /*64o*/ false,
    /*54o*/ false,
    /*44 */ true,
    /*43s*/ false,
    /*42s*/ false,
  ],
  [
    /*A3o*/ true,
    /*K3o*/ true,
    /*Q3o*/ false,
    /*J3o*/ false,
    /*T3o*/ false,
    /*93o*/ false,
    /*83o*/ false,
    /*73o*/ false,
    /*63o*/ false,
    /*53o*/ false,
    /*43o*/ false,
    /*33 */ true,
    /*32s*/ false,
  ],
  [
    /*A2o*/ true,
    /*K2o*/ true,
    /*Q2o*/ false,
    /*J2o*/ false,
    /*T2o*/ false,
    /*92o*/ false,
    /*82o*/ false,
    /*72o*/ false,
    /*62o*/ false,
    /*52o*/ false,
    /*42o*/ false,
    /*32o*/ false,
    /*22 */ true,
  ],
]

export const hj: HintTable = [
  [
    /*AA */ true,
    /*AKs*/ true,
    /*AQs*/ true,
    /*AJs*/ true,
    /*ATs*/ true,
    /*A9s*/ true,
    /*A8s*/ true,
    /*A7s*/ true,
    /*A6s*/ true,
    /*A5s*/ true,
    /*A4s*/ true,
    /*A3s*/ true,
    /*A2s*/ true,
  ],
  [
    /*AKo*/ true,
    /*KK */ true,
    /*KQs*/ true,
    /*KJs*/ true,
    /*KTs*/ true,
    /*K9s*/ true,
    /*K8s*/ true,
    /*K7s*/ true,
    /*K6s*/ true,
    /*K5s*/ true,
    /*K4s*/ true,
    /*K3s*/ true,
    /*K2s*/ true,
  ],
  [
    /*AQo*/ true,
    /*KQo*/ true,
    /*QQ */ true,
    /*QJs*/ true,
    /*QTs*/ true,
    /*Q9s*/ true,
    /*Q8s*/ true,
    /*Q7s*/ true,
    /*Q6s*/ true,
    /*Q5s*/ true,
    /*Q4s*/ true,
    /*Q3s*/ true,
    /*Q2s*/ true,
  ],
  [
    /*AJo*/ true,
    /*KJo*/ true,
    /*QJo*/ true,
    /*JJ */ true,
    /*JTs*/ true,
    /*J9s*/ true,
    /*J8s*/ true,
    /*J7s*/ true,
    /*J6s*/ true,
    /*J5s*/ true,
    /*J4s*/ true,
    /*J3s*/ false,
    /*J2s*/ false,
  ],
  [
    /*ATo*/ true,
    /*KTo*/ true,
    /*QTo*/ true,
    /*JTo*/ true,
    /*TT */ true,
    /*T9s*/ true,
    /*T8s*/ true,
    /*T7s*/ true,
    /*T6s*/ true,
    /*T5s*/ false,
    /*T4s*/ false,
    /*T3s*/ false,
    /*T2s*/ false,
  ],
  [
    /*A9o*/ true,
    /*K9o*/ true,
    /*Q9o*/ true,
    /*J9o*/ true,
    /*T9o*/ true,
    /*99 */ true,
    /*98s*/ true,
    /*97s*/ true,
    /*96s*/ true,
    /*95s*/ false,
    /*94s*/ false,
    /*93s*/ false,
    /*92s*/ false,
  ],
  [
    /*A8o*/ true,
    /*K8o*/ true,
    /*Q8o*/ true,
    /*J8o*/ true,
    /*T8o*/ true,
    /*98o*/ true,
    /*88 */ true,
    /*87s*/ true,
    /*86s*/ true,
    /*85s*/ false,
    /*84s*/ false,
    /*83s*/ false,
    /*82s*/ false,
  ],
  [
    /*A7o*/ true,
    /*K7o*/ true,
    /*Q7o*/ true,
    /*J7o*/ false,
    /*T7o*/ false,
    /*97o*/ false,
    /*87o*/ false,
    /*77 */ true,
    /*76s*/ true,
    /*75s*/ true,
    /*74s*/ false,
    /*73s*/ false,
    /*72s*/ false,
  ],
  [
    /*A6o*/ true,
    /*K6o*/ true,
    /*Q6o*/ false,
    /*J6o*/ false,
    /*T6o*/ false,
    /*96o*/ false,
    /*86o*/ false,
    /*76o*/ false,
    /*66 */ true,
    /*65s*/ true,
    /*64s*/ false,
    /*63s*/ false,
    /*62s*/ false,
  ],
  [
    /*A5o*/ true,
    /*K5o*/ true,
    /*Q5o*/ false,
    /*J5o*/ false,
    /*T5o*/ false,
    /*95o*/ false,
    /*85o*/ false,
    /*75o*/ false,
    /*65o*/ false,
    /*55 */ true,
    /*54s*/ false,
    /*53s*/ false,
    /*52s*/ false,
  ],
  [
    /*A4o*/ true,
    /*K4o*/ true,
    /*Q4o*/ false,
    /*J4o*/ false,
    /*T4o*/ false,
    /*94o*/ false,
    /*84o*/ false,
    /*74o*/ false,
    /*64o*/ false,
    /*54o*/ false,
    /*44 */ true,
    /*43s*/ false,
    /*42s*/ false,
  ],
  [
    /*A3o*/ true,
    /*K3o*/ false,
    /*Q3o*/ false,
    /*J3o*/ false,
    /*T3o*/ false,
    /*93o*/ false,
    /*83o*/ false,
    /*73o*/ false,
    /*63o*/ false,
    /*53o*/ false,
    /*43o*/ false,
    /*33 */ true,
    /*32s*/ false,
  ],
  [
    /*A2o*/ true,
    /*K2o*/ false,
    /*Q2o*/ false,
    /*J2o*/ false,
    /*T2o*/ false,
    /*92o*/ false,
    /*82o*/ false,
    /*72o*/ false,
    /*62o*/ false,
    /*52o*/ false,
    /*42o*/ false,
    /*32o*/ false,
    /*22 */ true,
  ],
]

export const utg: HintTable = [
  [
    /*AA */ true,
    /*AKs*/ true,
    /*AQs*/ true,
    /*AJs*/ true,
    /*ATs*/ true,
    /*A9s*/ true,
    /*A8s*/ true,
    /*A7s*/ true,
    /*A6s*/ true,
    /*A5s*/ true,
    /*A4s*/ true,
    /*A3s*/ true,
    /*A2s*/ true,
  ],
  [
    /*AKo*/ true,
    /*KK */ true,
    /*KQs*/ true,
    /*KJs*/ true,
    /*KTs*/ true,
    /*K9s*/ true,
    /*K8s*/ true,
    /*K7s*/ true,
    /*K6s*/ true,
    /*K5s*/ true,
    /*K4s*/ true,
    /*K3s*/ true,
    /*K2s*/ true,
  ],
  [
    /*AQo*/ true,
    /*KQo*/ true,
    /*QQ */ true,
    /*QJs*/ true,
    /*QTs*/ true,
    /*Q9s*/ true,
    /*Q8s*/ true,
    /*Q7s*/ true,
    /*Q6s*/ true,
    /*Q5s*/ true,
    /*Q4s*/ true,
    /*Q3s*/ true,
    /*Q2s*/ true,
  ],
  [
    /*AJo*/ true,
    /*KJo*/ true,
    /*QJo*/ true,
    /*JJ */ true,
    /*JTs*/ true,
    /*J9s*/ true,
    /*J8s*/ true,
    /*J7s*/ true,
    /*J6s*/ true,
    /*J5s*/ true,
    /*J4s*/ true,
    /*J3s*/ true,
    /*J2s*/ false,
  ],
  [
    /*ATo*/ true,
    /*KTo*/ true,
    /*QTo*/ true,
    /*JTo*/ true,
    /*TT */ true,
    /*T9s*/ true,
    /*T8s*/ true,
    /*T7s*/ true,
    /*T6s*/ true,
    /*T5s*/ false,
    /*T4s*/ false,
    /*T3s*/ false,
    /*T2s*/ false,
  ],
  [
    /*A9o*/ true,
    /*K9o*/ true,
    /*Q9o*/ true,
    /*J9o*/ true,
    /*T9o*/ true,
    /*99 */ true,
    /*98s*/ true,
    /*97s*/ true,
    /*96s*/ true,
    /*95s*/ true,
    /*94s*/ false,
    /*93s*/ false,
    /*92s*/ false,
  ],
  [
    /*A8o*/ true,
    /*K8o*/ true,
    /*Q8o*/ true,
    /*J8o*/ true,
    /*T8o*/ true,
    /*98o*/ true,
    /*88 */ true,
    /*87s*/ true,
    /*86s*/ true,
    /*85s*/ true,
    /*84s*/ false,
    /*83s*/ false,
    /*82s*/ false,
  ],
  [
    /*A7o*/ true,
    /*K7o*/ true,
    /*Q7o*/ false,
    /*J7o*/ false,
    /*T7o*/ false,
    /*97o*/ false,
    /*87o*/ false,
    /*77 */ true,
    /*76s*/ true,
    /*75s*/ true,
    /*74s*/ false,
    /*73s*/ false,
    /*72s*/ false,
  ],
  [
    /*A6o*/ true,
    /*K6o*/ true,
    /*Q6o*/ false,
    /*J6o*/ false,
    /*T6o*/ false,
    /*96o*/ false,
    /*86o*/ false,
    /*76o*/ false,
    /*66 */ true,
    /*65s*/ true,
    /*64s*/ false,
    /*63s*/ false,
    /*62s*/ false,
  ],
  [
    /*A5o*/ true,
    /*K5o*/ true,
    /*Q5o*/ false,
    /*J5o*/ false,
    /*T5o*/ false,
    /*95o*/ false,
    /*85o*/ false,
    /*75o*/ false,
    /*65o*/ false,
    /*55 */ true,
    /*54s*/ true,
    /*53s*/ false,
    /*52s*/ false,
  ],
  [
    /*A4o*/ true,
    /*K4o*/ true,
    /*Q4o*/ false,
    /*J4o*/ false,
    /*T4o*/ false,
    /*94o*/ false,
    /*84o*/ false,
    /*74o*/ false,
    /*64o*/ false,
    /*54o*/ false,
    /*44 */ true,
    /*43s*/ false,
    /*42s*/ false,
  ],
  [
    /*A3o*/ true,
    /*K3o*/ false,
    /*Q3o*/ false,
    /*J3o*/ false,
    /*T3o*/ false,
    /*93o*/ false,
    /*83o*/ false,
    /*73o*/ false,
    /*63o*/ false,
    /*53o*/ false,
    /*43o*/ false,
    /*33 */ true,
    /*32s*/ false,
  ],
  [
    /*A2o*/ true,
    /*K2o*/ false,
    /*Q2o*/ false,
    /*J2o*/ false,
    /*T2o*/ false,
    /*92o*/ false,
    /*82o*/ false,
    /*72o*/ false,
    /*62o*/ false,
    /*52o*/ false,
    /*42o*/ false,
    /*32o*/ false,
    /*22 */ true,
  ],
]

export default new Map<Position, HintTable>([
  [Position.SB, sb],
  [Position.B, button],
  [Position.CO, co],
  [Position.HJ, hj],
  [Position.UTG, utg],
])
