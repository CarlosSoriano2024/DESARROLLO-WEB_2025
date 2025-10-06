import mysql.connector
def conectar():
    try:
        conexion = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",  # vacío por defecto en XAMPP
            database="libreria_don_danny"
        )
        return conexion
    except mysql.connector.Error as error:
        print("Error de conexión:", error)
        return None

