import mysql.connector

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="", 
        database="libreria_don_danny"
    )
def agregar_libro(titulo, autor, categoria, stock):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO libros (titulo, autor, categoria, stock)
        VALUES (%s, %s, %s, %s)
    """, (titulo, autor, categoria, stock))
    conn.commit()
    conn.close()
    def obtener_libros():
    conn = conectar()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM libros")
    libros = cursor.fetchall()
    conn.close()
    return libros
def editar_libro(id, titulo, autor, categoria, stock):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE libros SET titulo=%s, autor=%s, categoria=%s, stock=%s WHERE id=%s
    """, (titulo, autor, categoria, stock, id))
    conn.commit()
    conn.close()
    def eliminar_libro(id):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM libros WHERE id=%s", (id,))
    conn.commit()
    conn.close()
    import mysql.connector

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="libreria_don_danny"
    )
def insertar_usuario(nombre, correo):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (nombre, correo) VALUES (%s, %s)", (nombre, correo))
    conn.commit()
    conn.close()
