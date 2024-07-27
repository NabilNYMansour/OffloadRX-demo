import { rem } from '@mantine/core';

interface AddressBookIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export const OffloadRX = ({ size, style, ...others }: AddressBookIconProps) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={100}
    width="24"
    height="40"
    viewBox="0 0 48 48"
    style={{ width: rem(size), height: rem(size), ...style }}
    {...others}
  >
    <g transform="matrix(0.008727, 0, 0, -0.008727, -1.744933, 50.616968)" >
      <path d="M2483 5525 l7 -275 -275 6 -275 6 0 -411 c0 -320 -6 -411 -25 -411&#10;-26 0 -1158 -316 -1166 -325 -194 -250 -549 -744 -549 -763 0 -49 70 -87 295&#10;-161 l225 -74 0 -638 0 -638 45 -29 c25 -15 527 -227 1117 -471 l1072 -443&#10;588 243 c323 134 818 337 1098 453 281 115 522 224 536 243 21 26 25 165 20&#10;657 l-6 624 220 74 c277 93 290 100 290 155 0 36 -449 669 -538 759 -9 9 -279&#10;91 -601 182 l-584 165 2 406 3 406 -281 -14 -281 -15 0 282 0 282 -472 0 -472&#10;0 7 -275z m737 -190 l0 -275 281 0 280 0 -5 -272 -6 -272 -275 3 -275 3 0&#10;-281 0 -281 -270 0 -270 0 0 281 0 281 -272 -3 -273 -3 2 267 1 267 271 6 271&#10;5 0 266 c0 147 4 270 8 275 5 4 126 8 270 8 l262 0 0 -275z m-736 -1295 l-9&#10;-280 472 0 473 0 0 280 0 280 190 0 c187 0 343 -36 1100 -257 77 -22 150 1&#10;-880 -281 l-880 -241 -130 38 c-227 66 -1365 378 -1500 411 -71 17 -143 37&#10;-160 43 -16 6 141 58 350 117 209 58 425 119 480 136 61 19 179 32 301 33&#10;l202 1 -9 -280z m-1350 -178 c671 -190 1602 -442 1632 -442 19 0 34 -5 34 -11&#10;0 -17 -503 -629 -517 -629 -11 -1 -1821 603 -1840 614 -9 5 395 546 407 546 4&#10;0 132 -35 284 -78z m3990 3 c28 -41 119 -163 203 -271 93 -119 143 -198 128&#10;-203 -14 -5 -428 -145 -920 -311 -493 -167 -903 -300 -913 -297 -21 9 -502&#10;598 -502 616 0 8 65 29 145 48 80 19 510 137 955 262 953 267 843 248 904 156z&#10;m-2259 -1700 c-3 -569 -12 -1033 -20 -1030 -8 2 -240 98 -515 212 -275 115&#10;-707 295 -960 400 l-460 190 -5 560 -6 559 646 -221 c809 -276 784 -269 824&#10;-236 18 15 136 156 263 314 127 158 232 287 234 287 2 0 2 -466 -1 -1035z&#10;m444 710 c148 -185 249 -295 272 -295 30 0 1189 389 1365 458 31 12 61 22 65&#10;22 24 0 8 -1116 -16 -1126 -105 -42 -1785 -739 -1860 -771 l-95 -42 0 1044 c0&#10;580 8 1035 17 1024 10 -10 123 -152 252 -314z" />
    </g>
  </svg>
}
