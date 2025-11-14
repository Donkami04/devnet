import logging
import logger_config
import traceback
from datetime import datetime


def format_data_funct(usersDataString, fw):
    from datetime import datetime
    import logging
    import traceback

    try:
        now = datetime.now()
        now_datetime = now.strftime("%Y-%m-%d %H:%M:%S")

        lines = usersDataString.splitlines()
        data = []

        for line in lines:
            # Divide usando cualquier cantidad de espacios en blanco como delimitador
            user_data = line.split()

            # Asegúrate de que tenga suficientes campos antes de procesar
            if len(user_data) >= 7:  # Ajusta según los índices esperados
                try:
                    email = user_data[1]
                    ip_origin = user_data[3]
                    duration = int(user_data[4]) if user_data[4].isdigit() else 0
                    ip_lan = user_data[6]

                    # Convierte la duración a minutos
                    duration = duration // 60
                    user_dict = {
                        "email": email,
                        "ip_lan": ip_lan,
                        "ip_origin": ip_origin,
                        "duration": duration,
                        "fw": fw,
                        "datetime": now_datetime,
                    }
                    data.append(user_dict)
                except (IndexError, ValueError) as e:
                    logging.warning(f"Error procesando línea: {line}. Detalles: {e}")
            else:
                logging.warning(f"Línea ignorada por formato incorrecto: {line}")
        print(data)
        print(len(data))
        return data

    except Exception as e:
        logging.error(traceback.format_exc())
        return [
            {
                "email": "Error DevNet",
                "ip_lan": "Error DevNet",
                "ip_origin": "Error DevNet",
                "duration": 0,
                "fw": fw,
                "datetime": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }
        ]


# string = """
#  0      v-m.arriaza@lundinmining.com    CD-SSLVPN-Gpolicy-B    181.43.150.54    26161   5715511/26114465       10.225.19.1
#  1       karina.varas@lundinmining.com   CD-SSLVPN-Gpolicy-A    190.101.244.24   10353   5047105/7090054        10.225.19.2
#  2       v-c.bondi@lundinmining.com      CD-SSLVPN-Gpolicy-A    191.126.51.203   14689   5546583/11132435       10.225.19.3
#  3       paulina.goic@lundinmining.com   CD-SSLVPN-Gpolicy-A    179.8.3.103      888     19693090/76366755      10.225.19.4
#  4       v-j.reyes.r@lundinmining.com    CD-SSLVPN-Gpolicy-B    179.2.190.72     12772   9222763/11583608       10.225.19.5
#  5       nara.miorini@lundinmining.com   CD-SSLVPN-Gpolicy-A    181.43.203.141   16580   28099863/41352686      10.225.19.6
#  6       christian.e.vacca@lundinmining.com      CD-SSLVPN-Gpolicy-A    181.200.82.154   17379   3312059/10999850       10.225.19.7
#  7       kathia.rojas@lundinmining.com   CD-SSLVPN-Gpolicy-A    179.57.66.84     802     675046/1882059         10.225.19.8
#  8       daniela.torres@lundinmining.com         CD-SSLVPN-Gpolicy-A    179.8.15.211     17122   109486734/83168714     10.225.19.9
#  9       marcela.torrejon@lundinmining.com       CD-SSLVPN-Gpolicy-A    190.45.75.10     17017   4734949/14784818       10.225.19.10
#  10      cecilia.aravena@lundinmining.com        CD-SSLVPN-Gpolicy-A    152.173.124.121          9208    2045507/3579192        10.225.19.11
#  11      v-c.donoso.a@lundinmining.com   CD-SSLVPN-Gpolicy-A    138.84.33.226    11860   2391252/5818611        10.225.19.12
#  12      antonio.pizarro@lundinmining.com        CD-SSLVPN-Gpolicy-B    186.156.9.11     15482   159469703/78617333     10.225.19.13
#  13      juan.pino@lundinmining.com      CD-SSLVPN-Gpolicy-B    190.100.118.173          15770   6889998/11191614       10.225.19.14
#  14      v-r.cortes@lundinmining.com     CD-SSLVPN-Gpolicy-A    152.174.199.122          13466   3810024/39201427       10.225.19.15
#  15      shc.cl.can.stecnico@lundinmining.com    CD-SSLVPN-Gpolicy-A    152.174.237.184          15569   182340810/161657220    10.225.19.16
#  16      v-a.franco@lundinmining.com     CD-SSLVPN-Sona-A       190.255.208.43   14724   15495697/77904146      10.225.21.1
#  17      v-a.jopia@lundinmining.com      CD-SSLVPN-Gpolicy-B    186.156.245.238          15252   16378997/22104051      10.225.19.18
#  18      shc.cl.can.ing6@lundinmining.com        CD-SSLVPN-Gpolicy-B    190.164.235.68   1112    2976280/11346358       10.225.19.19
#  19      marco.martin@lundinmining.com   CD-SSLVPN-Gpolicy-A    201.246.178.27   14636   7944599/225050610      10.225.19.17
#  20      sebastian.rojas@lundinmining.com        CD-SSLVPN-Gpolicy-A    186.11.91.193    8050    4311415/12360271       10.225.19.20
#  21      lila.avila@lundinmining.com     CD-SSLVPN-Gpolicy-A    181.43.39.170    11531   27278481/33303801      10.225.19.21
#  22      patricio.ruz@lundinmining.com   CD-SSLVPN-Gpolicy-A    190.95.123.25    12533   2290384/5712268        10.225.19.22
#  23      paulo.llaves@lundinmining.com   CD-SSLVPN-Gpolicy-A    152.172.18.67    12815   7717983/107116092      10.225.19.23
#  24      v-g.diaz@lundinmining.com       CD-SSLVPN-Gpolicy-B    181.42.46.121    12799   5163131/11530717       10.225.19.24
#  25      sebastian.olivares@lundinmining.com     CD-SSLVPN-Gpolicy-A    148.222.205.165          1679    957689/12286217        10.225.19.25
#  26      silvana.barriga@lundinmining.com        CD-SSLVPN-Gpolicy-A    181.200.57.10    9172    2199615/11557466       10.225.19.26
#  27      jose.rios@lundinmining.com      CD-SSLVPN-Gpolicy-A    186.79.23.149    12491   7880774/40415044       10.225.19.27
#  28      mario.c.leiva@lundinmining.com          CD-SSLVPN-Gpolicy-A    191.127.237.5    12197   6017784/11401118       10.225.19.28
#  29      orlando.reyes@lundinmining.com          CD-SSLVPN-Gpolicy-A    138.84.33.95     7018    3779316/10540615       10.225.19.29
#  30      daniela.angulo@lundinmining.com         CD-SSLVPN-Gpolicy-A    190.101.142.198          11171   7915144/33804878       10.225.19.30
#  31      jorge.torres@lundinmining.com   CD-SSLVPN-Gpolicy-A CD-SSLVPN-OMT-A    190.160.100.137          4050    2749967/7976198        10.225.19.31
#  32      horacio.banados@lundinmining.com        CD-SSLVPN-Gpolicy-A    186.21.18.116    1879    750939/1878098         10.225.19.32
#  33      veronica.quijanes@lundinmining.com      CD-SSLVPN-Gpolicy-B    190.47.120.216   11526   15132270/55463859      10.225.19.33
#  34      rodrigo.grogg@lundinmining.com          CD-SSLVPN-Gpolicy-A    148.222.205.84   11337   19451780/29490296      10.225.19.34
#  35      viviana.carrasco@lundinmining.com       CD-SSLVPN-Gpolicy-A    190.5.36.79      11333   15283198/95038330      10.225.19.35
#  36      paola.belemmi@lundinmining.com          CD-SSLVPN-Gpolicy-A    148.222.205.5    11101   13073240/35334809      10.225.19.36
#  38      alan.cerda@lundinmining.com     CD-SSLVPN-Gpolicy-A    181.43.96.209    10105   4219057/10827886       10.225.19.38
#  39      fabiola.gaete@lundinmining.com          CD-SSLVPN-Gpolicy-A    152.174.224.78   9914    6910014/17172837       10.225.19.39
#  40      fernanda.pesenti@lundinmining.com       CD-SSLVPN-Gpolicy-A    148.222.205.36   7894    4341410/9311956        10.225.19.40
#  41      jose.ponce@lundinmining.com     CD-SSLVPN-Gpolicy-A    179.9.2.116      8879    11217331/200817408     10.225.19.41
#  42      david.catalan@lundinmining.com          CD-SSLVPN-Gpolicy-B    181.161.21.204   1843    1697192/4441789        10.225.19.42
#  43      v-j.fernandez@lundinmining.com          CD-SSLVPN-Gpolicy-A    190.47.193.173   1197    1326778/2587681        10.225.19.43
#  44      v-s.godoy@lundinmining.com      CD-SSLVPN-Gpolicy-A    138.84.35.71     7239    2960926/9145101        10.225.19.44
#  45      makarena.vitali@lundinmining.com        CD-SSLVPN-Gpolicy-A    190.54.81.204    774     3478353/7092765        10.225.19.45
#  48      marina.salas@lundinmining.com   CD-SSLVPN-Gpolicy-A    186.10.141.168   478     750134/1651639         10.225.19.48
#  49      v-j.munera@lundinmining.com     CD-SSLVPN-Sona-B       179.32.195.15    236     106259/1550212         10.225.21.2
#  """
# format_data_funct(string, 1)
