# login.py
from flask import Blueprint, redirect, request, url_for, session
import msal
import uuid
from config import CLIENT_ID, CLIENT_SECRET, AUTHORITY, REDIRECT_URI, FLASK_SECRET_KEY

login_bp = Blueprint('login', __name__)
SCOPE = ["openid", "offline_access"]

@login_bp.route("/login")
def login():
    session["state"] = str(uuid.uuid4())
    auth_url = _build_auth_url(state=session["state"])
    return redirect(auth_url)

@login_bp.route("/getAToken")
def authorized():
    if request.args.get('state') != session.get("state"):
        return redirect(url_for('index'))

    if "error" in request.args:
        return f"Error: {request.args['error']}, Description: {request.args.get('error_description')}"

    if "code" in request.args:
        cache = _load_cache()
        result = _build_msal_app(cache=cache).acquire_token_by_authorization_code(
            request.args['code'],
            scopes=SCOPE,
            redirect_uri=REDIRECT_URI)

        if "error" in result:
            return f"Error: {result['error']}, Description: {result.get('error_description')}"

        session["user"] = result.get("id_token_claims")
        _save_cache(cache)

    return redirect(url_for("index"))

@login_bp.route("/logout")
def logout():
    session.clear()
    logout_url = f"{AUTHORITY}/oauth2/v2.0/logout?post_logout_redirect_uri={url_for('index', _external=True)}"
    return redirect(logout_url)

# Helper functions
def _build_msal_app(cache=None):
    return msal.ConfidentialClientApplication(
        CLIENT_ID,
        authority=AUTHORITY,
        client_credential=CLIENT_SECRET,
        token_cache=cache)

def _build_auth_url(state=None):
    return _build_msal_app().get_authorization_request_url(
        scopes=SCOPE,
        state=state or str(uuid.uuid4()),
        redirect_uri=REDIRECT_URI)

def _load_cache():
    cache = msal.SerializableTokenCache()
    if session.get('token_cache'):
        cache.deserialize(session['token_cache'])
    return cache

def _save_cache(cache):
    if cache.has_state_changed:
        session['token_cache'] = cache.serialize()
