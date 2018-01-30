# phonePL
Regular expression to validate Polish phone numbers

```regexp
(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}
```
## Details

Polish telephone numbers have 9 digits (excluding the country code). This regular expression matches 640 000 000 possible phone numbers:

![visualization](https://raw.githubusercontent.com/skotniczny/phonePL/master/images/visual_regex.png)

[debuggex.com](https://www.debuggex.com/r/ET8g3vYNVxYRiPXh)

Matches following ranges:

### Mobile numbers

45x xxx xxx  
50x xxx xxx  
51x xxx xxx  
53x xxx xxx  
57x xxx xxx  
60x xxx xxx  
66x xxx xxx  
69x xxx xxx  
72x xxx xxx  
73x xxx xxx  
78x xxx xxx  
79x xxx xxx  
88x xxx xxx  

### Fixed-line numbers (Starting with area codes) 

12x xxx xxx — Kraków  
13x xxx xxx — Krosno  
14x xxx xxx — Tarnów  
15x xxx xxx — Tarnobrzeg  
16x xxx xxx — Przemyśl  
17x xxx xxx — Rzeszów  
18x xxx xxx — NowySącz  
22x xxx xxx — Warszawa  
23x xxx xxx — Ciechanów  
24x xxx xxx — Płock  
25x xxx xxx — Siedlce  
29x xxx xxx — Ostrołęka  
32x xxx xxx — Katowice  
33x xxx xxx — Bielsko Biała  
34x xxx xxx — Częstochowa  
41x xxx xxx — Kielce  
42x xxx xxx — Łódź  
43x xxx xxx — Sieradz  
44x xxx xxx — Piotrków Trybunalski  
46x xxx xxx — Skierniewice  
48x xxx xxx — Radom  
52x xxx xxx — Bydgoszcz  
54x xxx xxx — Włocławek  
55x xxx xxx — Elbląg  
56x xxx xxx — Toruń  
58x xxx xxx — Gdańsk  
59x xxx xxx — Słupsk  
61x xxx xxx — Poznań  
62x xxx xxx — Kalisz  
63x xxx xxx — Konin  
65x xxx xxx — Leszno  
67x xxx xxx — Piła  
68x xxx xxx — Zielona Góra  
71x xxx xxx — Wrocław  
74x xxx xxx — Wałbrzych  
75x xxx xxx — Jelenia Góra  
76x xxx xxx — Legnica  
77x xxx xxx — Opole  
81x xxx xxx — Lublin  
82x xxx xxx — Chełm  
83x xxx xxx — Biała Podlaska  
84x xxx xxx — Zamość  
85x xxx xxx — Białystok  
86x xxx xxx — Łomża  
87x xxx xxx — Suwałki  
89x xxx xxx — Olsztyn  
91x xxx xxx — Szczecin  
94x xxx xxx — Koszalin  
95x xxx xxx — Gorzów Wielkopolski  

### Ministry of National Defence

26x xxx xxx  

### VoIP

39x xxx xxx  

## Node.js script

`libphone.js` is a script to test regular expression and compare results with [google-libphonenumber](https://github.com/ruimarinho/google-libphonenumber)