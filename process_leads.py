import sys

user_data = """Nº	ESTADO	ASESOR EDUCATIVO	NOMBRE	CANAL DE INGRESO	# Digital	TELÉFONO	UNIVERSIDAD	CONVOCATORIA	ÁREA DE ESTUDIO	FACULTAD	TÍTULO DE INTERÉS	ÚLTIMOS ESTUDIOS	DEPARTAMENTO	CIUDAD	EMPRESA	EMAIL	MÉTODO DE PAGO	F. PAGO RESERVA	MES CIERRE	INICIO CLASES	DESCUENTO	VALOR INICIAL	VALOR FINAL	PASA CUPÓN	COMENTARIO DIRECTOR	F. ULT. SEGUIMIENTO	TRANSFERIDO	INF. CONVENIO	INF. FINANCIERO	HOMOLOGACIÓN
1	Por contactar	Jose Sierra	Magaly Alfaro Fuentes	Digital	1959	+573107151091	Asturias	Otoño 2026	Especialización															No			No	No	No	No
2	Perdido	Sofia Aricapa Ladino	Esteban Berrio	Digital	1958	+573137853157	UNIR	Otoño 2026	Maestría															No			No	No	No	No
3	Por contactar	Jineth Janeth Sarmiento	Jeico	Digital	1957	+573134434268	UNIR	Otoño 2026	Maestría															No			No	No	No	No
4	Contactando	Yesica Marcela Giraldo	Ignacio Javela	Digital	1939	+573176827760	Asturias	Otoño 2026	Especialización	Derecho	Especialización En Derecho Administrativo													No		2026-07-14	No	No	No	No
5	Contactando	Yesica Marcela Giraldo	Oscar 	Digital	1947	+573207742121	Asturias	Otoño 2026	Maestría	Ciencias Económicas y Administrativas	Master Gerencia de Proyectos													No		2026-07-14	No	No	No	No
6	Contactando	Yesica Marcela Giraldo	Luz Esmeralda Rodríguez Casas	Digital	1951	+573217517389	Asturias	Otoño 2026	Especialización	Derecho	Especialización En Derecho Administrativo													No		2026-07-14	No	No	No	No
7	Contactando	Yesica Marcela Giraldo	Karvin Stevens Perafan Tovar	Digital	1937	+573234892639	Asturias	Otoño 2026	Pregrado	Derecho	Por definir Pre.													No		2026-07-14	No	No	No	No
8	Por contactar	Jineth Janeth Sarmiento	Gina Paola Torres	Digital	1941	+573102767486	UNIR	Otoño 2026	Maestría															No			No	No	No	No
9	Por contactar	Jineth Janeth Sarmiento	Por definir	Digital	1942	+573106096102	UNIR	Otoño 2026	Maestría															No			No	No	No	No
10	Por contactar	Jineth Janeth Sarmiento	María serna	Digital	1943	+573046399822	UNIR	Otoño 2026	Maestría															No			No	No	No	No
11	Por contactar	Jineth Janeth Sarmiento	Iván Angulo Valenzuela	Digital	1944	+573028638229	UNIR	Otoño 2026	Maestría															No			No	No	No	No
12	Por contactar	Yeisi Gallego	Marisol Giron Cortez	Digital	1940	+573112074741	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
13	Por contactar	Yeisi Gallego	Carmen Castellanos	Digital	1945	+573192144949	UNIR	Otoño 2026	Maestría															No			No	No	No	No
14	Por contactar	Yeisi Gallego	Por definir	Digital	1946	+573113431082	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
15	Contactando	Sofia Aricapa Ladino	Pedro Cabrera	Digital	1948	+573022594212	UNIR	Otoño 2026	Maestría															No			No	No	No	No
16	Contactando	Sofia Aricapa Ladino	Carmelo Marzu	Digital	1949	+573143926087	UNIR	Otoño 2026	Maestría															No			No	No	No	No
17	Valorando/Cupón	Sofia Aricapa Ladino	Alberto	Digital	1950	+573132138622	UNIR	Otoño 2026	Maestría															No			No	No	No	No
18	Por contactar	Jineth Janeth Sarmiento	Por definir	Digital	1952	+573152494891	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
19	Por contactar	Jineth Janeth Sarmiento	Por definir	Digital	1953	+573224371299	UNIR	Otoño 2026	Maestría															No			No	No	No	No
20	Por contactar	Jineth Janeth Sarmiento	Jaime M	Digital	1954	+573013640298	UNIR	Otoño 2026	Maestría	Derecho														No			No	No	No	No
21	Por contactar	Camilo Loaiza	Jhon Jarrinson Arce larrahondo 	Digital	1955	+573217193454	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
22	Por contactar	Camilo Loaiza	Luis Carlos	Digital	1956	+573115486127	UNAC	Otoño 2026	Maestría															No			No	No	No	No
23	Por contactar	Camilo Loaiza	Luis Niño	Digital	1936	+573203334924	UNIR	Otoño 2026	Maestría	Derecho														No			No	No	No	No
24	Valorando/Cupón	Jineth Janeth Sarmiento	Elis Moreno	Digital	1935	+573124488276	UNIR	Otoño 2026	Maestría	Derecho														No			No	No	No	No
25	Contactando	Sofia Aricapa Ladino	Yudy Smith Carvajal 	Digital	1934	+573164891823	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
26	Perdido	Yeisi Gallego	Jairo Cogollo Figueroa	Digital	1933	+573135443916	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
27	Valorando/Cupón	Yeisi Gallego	Yorfanny Vargas Olmos	Digital	1932	+573125421151	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
28	Contactando	Jineth Janeth Sarmiento	Eduardo Mar	Digital	1921	+573234471568	UNIR	Otoño 2026	Maestría															No			No	No	No	No
29	Perdido	Sofia Aricapa Ladino	Jhon Porras	Digital	1928	+573177185898	UNIR	Otoño 2026	Maestría															No			No	No	No	No
30	Valorando/Cupón	Sofia Aricapa Ladino	Miguel Ignacio Quintero Farias	Digital	1929	+573176991011	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
31	Siguiente Convocatoria	Yeisi Gallego	Carlos Chaparro	Digital	1931	+573133448606	UNIR	Otoño 2026	Maestría															No			No	No	No	No
32	Contactando	Jineth Janeth Sarmiento	Sara Valentina Melo	Digital	1930	+573104792492	UNIR	Otoño 2026	Maestría															No			No	No	No	No
33	Contactando	Jineth Janeth Sarmiento	Jenny Castellanos	Digital	1925	+573142732984	UNIR	Otoño 2026																No			No	No	No	No
34	Perdido	Sofia Aricapa Ladino	Armando Rafael	Digital	1927	+573246872755	UNIR	Otoño 2026	Maestría	Derecho														No			No	No	No	No
35	Contactando	Jineth Janeth Sarmiento	Elkin Rodriguez Paez	Digital	1926	+573208170156	UNIR	Otoño 2026	Maestría	Derecho														No			No	No	No	No
36	Valorando/Cupón	Yeisi Gallego	Yaquelin Estrada Montiel	Digital	1924	+573135553730	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
37	Contactando	Jineth Janeth Sarmiento	Mauricio Monroy	Digital	1923	+573123647345	UNIR	Otoño 2026	Maestría															No			No	No	No	No
38	Contactando	Nathaly Rojas Barreiro	Orlando	Digital	1922	+573178942526	UNIR	Otoño 2026	Maestría															No			No	No	No	No
39	Contactando	Jineth Janeth Sarmiento	Sebastián Rojas	Digital	1920	+573125631334	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
40	Valorando/Cupón	Nathaly Rojas Barreiro	José Viafara	Digital	1919	+573216341614	UNIR	Otoño 2026	Maestría	Administración de la Salud														No			No	No	No	No
41	Contactando	Camilo Loaiza	Ena Gulnara Castillo Lara	Digital	1918	+573186707003	UNIR	Otoño 2026	Maestría															No			No	No	No	No
42	Valorando/Cupón	Camilo Loaiza	Guillermo	Digital	1917	+573202513759	UNIR	Otoño 2026	Maestría															No			No	No	No	No
43	Contactando	Sofia Aricapa Ladino	Liliana Ballén	Digital	1916	+573114792888	UNIR	Otoño 2026	Maestría															No			No	No	No	No
44	Contactando	Jineth Janeth Sarmiento	Jhonny Huertas Márquez	Digital	1915	+573128516176	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
45	Valorando/Cupón	Nathaly Rojas Barreiro	Manuel Arenas	Digital	1912	+573158652646	UNIR	Otoño 2026	Maestría							Manuelr_arenas@hotmail.com								No			No	No	No	No
46	Contactando	Jineth Janeth Sarmiento	Diana Garrido	Digital	1913	+573112590426	UNIR	Otoño 2026	Maestría															No			No	No	No	No
47	Valorando/Cupón	Yesica Marcela Giraldo	Angel Gutiérrez	Digital	1914	+573003041849	Asturias	Otoño 2026	Especialización				Atlántico	Barranquilla										No		2026-07-11	No	No	No	No
48	Perdido	Nathaly Rojas Barreiro	Makanaky	Digital	1911	+573114941576	UNIR	Otoño 2026	Maestría	Derecho	Derecho Ambiental													No			No	No	No	No
49	Siguiente Convocatoria	Jineth Janeth Sarmiento	Mariana	Digital	1910	+573165685029	UNIR	Otoño 2026	Maestría															No			No	No	No	No
50	Contactando	Sofia Aricapa Ladino	José Agustín De Ávila Mendoza	Digital	1909	+573022269766	UNIR	Otoño 2026	Maestría	Derecho														No			No	No	No	No
51	Valorando/Cupón	Yeisi Gallego	Carolina López	Digital	1908	+573024451961	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
52	Perdido	Sofia Aricapa Ladino	Maira alejandra silva	Digital	1899	+573022712036	UNIR	Otoño 2026	Maestría															No			No	No	No	No
53	Valorando/Cupón	Jineth Janeth Sarmiento	Carvajal	Digital	1900	+573227687085	UNIR	Otoño 2026	Maestría															No			No	No	No	No
54	Perdido	Nathaly Rojas Barreiro	Por definir	Digital	1902	+573105677870	UNIR	Otoño 2026	Maestría															No			No	No	No	No
55	Valorando/Cupón	Yeisi Gallego	Helem Ballesteros	Digital	1904	+573124186533	UNIR	Otoño 2026	Maestría															No			No	No	No	No
56	Valorando/Cupón	Sofia Aricapa Ladino	Por definir	Digital	1906	+573128367502	UNIR	Otoño 2026	Maestría															No			No	No	No	No
57	Contactando	Jineth Janeth Sarmiento	Jairo	Digital	1907	+573103383182	UNIR	Otoño 2026	Maestría															No			No	No	No	No
58	Contactando	Yesica Marcela Giraldo	Narvaez Guerrero	Digital	1905	+573177040251	Asturias	Otoño 2026	Especialización	Derecho	Especialización en Derecho Laboral													No			No	No	No	No
59	Contactando	Yesica Marcela Giraldo	Chritiam Camilo Beltran	Digital	1903	+573138976556	Asturias	Otoño 2026	Especialización															No			No	No	No	No
60	Contactando	Yesica Marcela Giraldo	Luis Aníbal Sierra Villamil	Digital	1901	+573168261747	Asturias	Otoño 2026	Especialización	Ciencias Económicas y Administrativas	Especialización En Gerencia De Proyectos													No			No	No	No	No
61	Perdido	Nathaly Rojas Barreiro	Diocelina	Digital	1898	+573128416918	UNIR	Otoño 2026	Maestría	Educación	Didáctica de la lengua Infantil y Primaria													No			No	No	No	No
62	Siguiente Convocatoria	Camilo Loaiza	Juan Chico	Digital	1897	+573115023880	UNIR	Otoño 2026	Maestría															No			No	No	No	No
63	Valorando/Cupón	Sofia Aricapa Ladino	Javier Vidal Araujo	Digital	1896	+573102315347	UNIR	Otoño 2026	Maestría															No			No	No	No	No
64	Contactando	Jineth Janeth Sarmiento	Nidia Sanchez Garcia	Digital	1895	+573107994022	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
65	Valorando/Cupón	Sofia Aricapa Ladino	Viviana	Digital	1894	+573174353488	UNIR	Otoño 2026	Maestría															No			No	No	No	No
66	Perdido	Nathaly Rojas Barreiro	José Corredor	Digital	1893	+573212513348	UNIR	Otoño 2026	Maestría															No			No	No	No	No
67	Perdido	Yeisi Gallego	Jefferson	Digital	1892	+573147917923	UNIR	Otoño 2026	Maestría															No			No	No	No	No
68	Contactando	Jineth Janeth Sarmiento	Nedys Quinto Orejuela	Digital	1891	+573217894748	UNIR	Otoño 2026	Maestría	Derecho	Derecho del Trabajo y de la Seguridad Social													No			No	No	No	No
69	Valorando/Cupón	Jineth Janeth Sarmiento	John Sandoval	Digital	1890	+573123916601	UNIR	Otoño 2026	Maestría															No			No	No	No	No
70	Valorando/Cupón	Camilo Loaiza	Alex Alvarez	Digital	1889	+573016796497	UNIR	Otoño 2026	Maestría															No			No	No	No	No
71	Perdido	Nathaly Rojas Barreiro	Everelis Pinedo Soto	Digital	1888	+573043786629	UNIR	Otoño 2026	Maestría															No			No	No	No	No
72	Perdido	Sofia Aricapa Ladino	Diego	Digital	1887	+573142232971	UNIR	Otoño 2026	Maestría							derc2017@gmail.com								No			No	No	No	No
73	Ganado	Yeisi Gallego	Maribel Cecilia Narváez Hernández 	Digital	1886	+573234822480	UNIR	Otoño 2026	Maestría	Educación	Liderazgo y Dirección de Centros Educativos		Antioquia	Arboletes		maribelcecilianarvaez@gmail.com 		2026-07-14	Julio					Sí			No	No	No	No
74	Valorando/Cupón	Jineth Janeth Sarmiento	Walter Villarreal	Digital	1885	+573226171965	UNIR	Otoño 2026	Maestría	Educación	Enseñanza de Inglés													No			No	No	No	No
75	Siguiente Convocatoria	Yeisi Gallego	Gimena Rodríguez Vargas	Digital	1884	+573208623336	UNIR	Otoño 2026	Maestría															No			No	No	No	No
76	Contactando	Jineth Janeth Sarmiento	Deivis Abadia	Digital	1883	+573146453904	UNIR	Otoño 2026	Maestría	Educación	Didáctica de la Biología y la Geología en Educación Secundaria y Bachillerato													No			No	No	No	No
77	Valorando/Cupón	Sofia Aricapa Ladino	Virgo Madero	Digital	1882	+573162980837	UNIR	Otoño 2026	Maestría															No			No	No	No	No
78	Perdido	Sofia Aricapa Ladino	Luis Gutierrez peñaranda	Digital	1881	+573232921662	UNIR	Otoño 2026	Maestría	Derecho														No			No	No	No	No
79	Perdido	Yeisi Gallego	Por definir	Digital	1880	+573112595281	UNIR	Otoño 2026	Maestría															No			No	No	No	No
80	Contactando	Yesica Marcela Giraldo	Agustín Pérez	Digital	1874	+573145423075	Asturias	Otoño 2026	Especialización															No		2026-07-06	No	No	No	No
81	Perdido	Nathaly Rojas Barreiro	Claudia Dueñez	Digital	1873	+573234612795	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
82	Perdido	Yeisi Gallego	Didier Alberto Hernández Obregón 	Digital	1875	+573133282830	UNIR	Otoño 2026	Maestría	Ciencias Económicas y Administrativas	Dirección y Gestión de Recursos Humanos - Executive		Antioquia	Apartadó		daobregon0519@gmail.com								Sí			No	No	No	No
83	Valorando/Cupón	Camilo Loaiza	Ulises Benitez Narvaez	Digital	1877	+573005754087	UNIR	Otoño 2026	Maestría															No			No	No	No	No
84	Perdido	Sofia Aricapa Ladino	Por definir	Digital	1876	+573167565871	UNIR	Otoño 2026	Maestría															No			No	No	No	No
85	Perdido	Jineth Janeth Sarmiento	Herly Flores	Digital	1878	+573169720563	UNIR	Otoño 2026	Maestría															No			No	No	No	No
86	Valorando/Cupón	Jineth Janeth Sarmiento	Marcos Lopez	Digital	1879	+573105566116	UNIR	Otoño 2026	Maestría							mlopezto19@gmail.com								No			No	No	No	No
87	Perdido	Nathaly Rojas Barreiro	Janneth	Digital	1872	+573182150427	UNIR	Otoño 2026	Maestría	Educación	Orientación Educativa Familiar													No			No	No	No	No
88	Perdido	Nathaly Rojas Barreiro	Orlando Galindo	Digital	1868	+573002238894	UNIR	Otoño 2026	Maestría															No			No	No	No	No
89	Valorando/Cupón	Yeisi Gallego	Norma Rojas	Digital	1869	+573133702369	UNIR	Otoño 2026	Maestría	Derecho														No			No	No	No	No
90	Perdido	Yeisi Gallego	Faber	Digital	1870	+573147558625	UNIR	Otoño 2026	Maestría	Derecho														No			No	No	No	No
91	Contactando	Jineth Janeth Sarmiento	Nory Delgado	Digital	1871	+573114863074	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
92	Valorando/Cupón	Jineth Janeth Sarmiento	Fernando	Digital	1867	+573116208234	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
93	Ganado	Yesica Marcela Giraldo	Jose Santos España Males	Digital	1866	+573147248119	Asturias	Otoño 2026	Especialización	Educación	Especialización en Innovación Educativa en Docencia Universitaria		Nariño	Pasto	Digital	joescolombia@gmail.com		2026-07-04	Julio			$ 7.500.000	$ 7.500.000	Sí	1994598	2026-07-03	No	No	No	No
94	Perdido	Sofia Aricapa Ladino	Adriana Nieto	Digital	1858	+573115239241	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
95	Valorando/Cupón	Sofia Aricapa Ladino	Yessy Masolen	Digital	1859	+573177325456	UNIR	Otoño 2026	Maestría															No			No	No	No	No
96	Perdido	Camilo Loaiza	Paola Jurado	Digital	1860	+573162901060	UNIR	Otoño 2026	Maestría	Administración de la Salud														No			No	No	No	No
97	Perdido	Nathaly Rojas Barreiro	Leonardo	Digital	1861	+573158316100	UNIR	Otoño 2026	Maestría				Huila	Pitalito										No			No	No	No	No
98	Valorando/Cupón	Jineth Janeth Sarmiento	Monica Cedith Gonzalez Barbosa	Digital	1863	+573208365739	UNIR	Otoño 2026	Maestría	Educación		Profesional/Licenciado				monicagonzalezbarbosa25@gmail.com	Financiado							No			No	No	No	No
99	Perdido	Nathaly Rojas Barreiro	Doris Montiel	Digital	1864	+573103684590	UNIR	Otoño 2026	Maestría				Córdoba	Montelíbano										No			No	No	No	No
100	Contactando	Yesica Marcela Giraldo	Cristian Orlando Molina Acevedo	Digital	1862	+573145686980	Asturias	Otoño 2026	Especialización															No		2026-07-03	No	No	No	No
101	Valorando/Cupón	Jineth Janeth Sarmiento	Armando Uyazán 	Digital	1857	+573152880342	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
102	Siguiente Convocatoria	Yeisi Gallego	Marlene Jaimes	Digital	1855	+573163098558	UNIR	Otoño 2026	Maestría	Educación														No			No	No	No	No
103	Valorando/Cupón	Jineth Janeth Sarmiento	Jackelin Maribel Epiayu Sijona	Digital	1856	+573202791619	UNIR	Otoño 2026	Maestría	Educación	Educación Emocional	Profesional/Licenciado	La Guajira	Fonseca		 jmepiayus@uniguajira.edu.co 	Financiado			Octubre	55%	$ 30.480.000	$ 13.716.000	Sí			No	No	No	No
104	Perdido	Sofia Aricapa Ladino	Alberto Benavides	Digital	1854	+573155758662	UNIR	Otoño 2026	Maestría															No			No	No	No	No
105	Siguiente Convocatoria	Nathaly Rojas Barreiro	Jhon Fernando Caro	Digital	1853	+573163002029	UNIR	Otoño 2026	Maestría	Ingeniería	Prevención de Riesgos Laborales	Ingeniero/Profesional	Cundinamarca		Alcaldía de El Colegio									No			No	No	No	No
106	Perdido	Yeisi Gallego	Mery Pascumal	Digital	1851	+573137222686	UNIR	Otoño 2026	Maestría	Administración de la Salud														No			No	No	No	No
107	Perdido	Camilo Loaiza	Sandro Javier	Digital	1852	+573214495100	UNIR	Otoño 2026																No			No	No	No	No
108	Valorando/Cupón	Jineth Janeth Sarmiento	Milena Mora	Digital	1850	+573208566440	UNIR	Otoño 2026	Maestría	Educación	Neuropsicología y Educación					asmimo0106@gmail.com								No			No	No	No	No
109	Perdido	Nathaly Rojas Barreiro	Magaly Reyes	Digital	1849	+573112475955	UNIR	Otoño 2026																No			No	No	No	No
110	Perdido	Camilo Loaiza	Norberto zapata Galeano	Digital	1848	+573021222596	UNIR	Otoño 2026	Maestría															No			No	No	No	No
111	Perdido	Nathaly Rojas Barreiro	Julian 	Digital	1847	+573218024587	UNIR	Otoño 2026	Maestría	Educación	Educación Inclusiva e Intercultural	Profesional/Licenciado												No			No	No	No	No
112	Perdido	Nathaly Rojas Barreiro	Por definir	Digital	1846	+573115857813	UNIR	Otoño 2026	Maestría															No			No	No	No	No
113	Perdido	Camilo Loaiza	Camilo	Digital	1845	+573002654276	UNIR	Otoño 2026	Maestría	Derecho	Derecho del Trabajo y de la Seguridad Social													No			No	No	No	No"""

lines = user_data.strip().split('\n')
header = "Nº;ESTADO;ASESOR EDUCATIVO;NOMBRE;TELÉFONO;CONVOCATORIA;CANAL DE INGRESO;# Digital;UNIVERSIDAD;ÁREA DE ESTUDIO;FACULTAD;TÍTULO DE INTERÉS;EMPRESA;EMAIL;ÚLTIMOS ESTUDIOS;CIUDAD;DEPARTAMENTO;MÉTODO DE PAGO;F. PAGO RESERVA;MES CIERRE;INICIO CLASES;DESCUENTO;VALOR INICIAL;VALOR FINAL;PASA CUPÓN;COMENTARIO DIRECTOR;F. ULT. SEGUIMIENTO;TRANSFERIDO;INF. CONVENIO;INF. FINANCIERO;HOMOLOGACIÓN;ÚLTIMA ACTUALIZACIÓN;FECHA CREADA"
target_cols = header.split(";")

input_headers = lines[0].split('\t')

col_mapping = []
for tc in target_cols:
    if tc in input_headers:
        col_mapping.append(input_headers.index(tc))
    else:
        col_mapping.append(-1)

new_data_lines = [header]

for line in lines[1:]:
    parts = line.split('\t')
    row_out = []
    for idx in col_mapping:
        if idx != -1 and idx < len(parts):
            row_out.append(parts[idx])
        else:
            row_out.append("")
    new_data_lines.append(";".join(row_out))

new_raw_data = "\n".join(new_data_lines)

with open("fix.ts", "r", encoding="utf-8") as f:
    fix_code = f.read()

new_content = "export const rawData = `" + new_raw_data + "`\n\n" + fix_code

with open("src/data.ts", "w", encoding="utf-8") as f:
    f.write(new_content)
print("done")
