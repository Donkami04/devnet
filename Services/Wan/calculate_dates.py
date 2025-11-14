import datetime
import calendar

def calculate_dates():
    now = datetime.datetime.now()
    ano_actual = now.year
    ano_actual_for_mes_anterior = now.year
    mes_actual = now.month

    if mes_actual == 1:  # Si es enero, restamos un mes y ajustamos el año
        mes_anterior = 12
        ano_actual_for_mes_anterior = ano_actual - 1
    else:
        mes_anterior = mes_actual - 1

    _, num_days_anterior = calendar.monthrange(ano_actual, mes_anterior)
    _, num_days_actual = calendar.monthrange(ano_actual, mes_actual)

    sdate_anterior = f"{ano_actual_for_mes_anterior}-{mes_anterior:02d}-01-00-00-00"
    edate_anterior = f"{ano_actual_for_mes_anterior}-{mes_anterior:02d}-{num_days_anterior}-23-59-59"

    sdate_actual = f"{ano_actual}-{mes_actual:02d}-01-00-00-00"
    edate_actual = f"{ano_actual}-{mes_actual:02d}-{num_days_actual}-23-59-59"

    sdate_hoy = f"{ano_actual}-{mes_actual:02d}-{now.day:02d}-00-00-00"
    edate_hoy = f"{ano_actual}-{mes_actual:02d}-{now.day:02d}-23-59-59"
    
    return sdate_anterior, edate_anterior, sdate_actual, edate_actual, sdate_hoy, edate_hoy