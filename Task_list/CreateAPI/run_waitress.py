# Esse código coloca sua aplicação Django no ar com um servidor de verdade,
# mais seguro e estável que o runserver, ideal para deploy em produção.(obs usado para testes antes do Deploy)


# venv: .\venv\Scripts\Activate.ps1
# pip freeze > requirements.txt
# Waitress: python run_waitress.py
# default:python manage.py runserver

from waitress import serve
from Task_list.wsgi import application

serve(
    application,
    host="0.0.0.0",
    port=10000,
)  # obs com o render usa 10000, no local usa 8000
