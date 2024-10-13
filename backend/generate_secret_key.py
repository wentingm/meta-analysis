# generate_secret_key.py
import secrets

# Generate a secure random secret key
secret_key = secrets.token_hex(32)
print(f"Your new Flask secret key is: {secret_key}")
