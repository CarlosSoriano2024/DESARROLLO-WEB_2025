from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def inicio():
    return render_template('index.html')

@app.route('/about')
def acerca():
    return render_template('about.html')

@app.route('/usuario/<nombre>')
def usuario(nombre):
    return render_template('index.html', nombre=nombre)

if __name__ == '__main__':
    app.run(debug=True)
    from db import obtener_libros, agregar_libro
    @app.route('/inventario')
def inventario():
    libros = obtener_libros()
    return render_template('inventario.html', libros=libros)
from db import insertar_usuario

@app.route('/guardar_mysql/<nombre>/<correo>')
def guardar_mysql(nombre, correo):
    insertar_usuario(nombre, correo)
    return f'Usuario {nombre} guardado en MySQL.'
from flask import Flask
from Conexión.conexion import conectar

app = Flask(__name__)

@app.route('/test_db')
def test_db():
    conn = conectar()
    if conn:
        return "✅ Conexión exitosa con MySQL"
    else:
        return "❌ Error al conectar con MySQL"

if __name__ == '__main__':
    app.run(debug=True)
    from flask import Flask, render_template, request, redirect, url_for
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from models.usuario import Usuario
from Conexión.conexion import conectar

app = Flask(__name__)
app.secret_key = 'clave_secreta_segura'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        nombre = request.form['nombre']
        correo = request.form['correo']
        contraseña = request.form['contraseña']
        conn = conectar()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO usuarios (nombre, correo, contraseña) VALUES (%s, %s, %s)",
                       (nombre, correo, contraseña))
        conn.commit()
        conn.close()
        return redirect(url_for('login'))
    return render_template('registro.html')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        correo = request.form['correo']
        contraseña = request.form['contraseña']
        conn = conectar()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios WHERE correo = %s AND contraseña = %s",
                       (correo, contraseña))
        datos = cursor.fetchone()
        conn.close()
        if datos:
            usuario = Usuario(datos['id'], datos['nombre'], datos['correo'], datos['contraseña'])
            login_user(usuario)
            return redirect(url_for('dashboard'))
    return render_template('login.html')
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))
@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', nombre=current_user.nombre)
