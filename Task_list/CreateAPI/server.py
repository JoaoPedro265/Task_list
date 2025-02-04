from waitress import serve
from Task_list.wsgi import application
import os

if __name__ == "__main__":
    # Isso pega a porta fornecida pelo Render via a variável de ambiente PORT, ou usa a porta 8000 como fallback, caso a variável não esteja presente.
    port = os.getenv("PORT", 8000)
    # host="0.0.0.0": Isso garante que a aplicação aceite conexões de qualquer interface de rede, permitindo que o Render acesse a aplicação de fora do container.
    serve(application, host="0.0.0.0", port=port)
