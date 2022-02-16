import os 
from datetime import timedelta

from flask import Flask, render_template, redirect, session


port = int(os.environ['PORT'])
app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']
app.permanent_session_lifetime = timedelta(minutes=60) 


@app.route('/')
def index():
    return render_template(
        'index.html',
        input_values={
            'title': 'ホーム',
            'js_file_name': 'home.js',
        },
    )


@app.route("/adage/post")
def adage_post():
    return render_template(
        'adagePost.html',
        input_values={
            'title': '格言投稿フォーム',
            'js_path': 'adage',
            'js_file_name': 'post.js',
        },
    )


@app.route('/user/singup')
def user_singup():
    return render_template(
        'user/singup.html',
        input_values={
            'title': 'ユーザー新規登録',
            'js_path': 'user',
            'js_file_name': 'signup.js',
        },
    )


@app.route('/user/confirm')
def user_confirm():
    return render_template(
        'user/confirm.html',
        input_values={
            'title': '認証コード送信',
            'js_path': 'user',
            'js_file_name': 'confirm.js',
        },
    )


@app.route('/user/login')
def user_login():
    return render_template(
        'user/login.html',
        input_values={
            'title': 'ログイン',
            'js_path': 'user',
            'js_file_name': 'login.js',
        },
    )


@app.route('/user/setting')
def user_setting():
    return render_template(
        'user/setting.html',
        input_values={
            'title': 'ユーザ設定',
            'js_path': 'user',
            'js_file_name': 'setting.js',
        },
    )


@app.route('/user/delete')
def user_delete():
    return render_template(
        'user/delete.html',
        input_values={
            'title': 'ユーザ削除',
            'js_path': 'user',
            'js_file_name': 'delete.js',
        },
    )


@app.route('/user/sendResetPasswordCode')
def user_send_reset_password_code():
    return render_template(
        'user/sendResetPasswordCode.html',
        input_values={
            'title': 'パスワード初期化(コード送信)',
            'js_path': 'user',
            'js_file_name': 'sendResetPasswordCode.js',
        },
    )


@app.route('/user/resetPassword')
def user_reset_password():
    return render_template(
        'user/resetPassword.html',
        input_values={
            'title': 'パスワード初期化',
            'js_path': 'user',
            'js_file_name': 'resetPassword.js',
        },
    )


@app.route('/process/login')
def process_login():
    session['idToken'] = 'true'
    return redirect('/adage/post')


@app.route('/process/logout')
def process_logout():
    session.clear()
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=port)