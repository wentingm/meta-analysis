import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Facebook, Linkedin, Mail, Lock, Loader } from 'lucide-react';
import './AuthComponent.css';

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Initialize Google OAuth
    const initializeGoogleOAuth = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.google?.accounts.id.initialize({
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
          callback: handleGoogleResponse
        });
      };
    };

    const initializeFacebookSDK = () => {
      window.fbAsyncInit = function() {
        FB.init({
          appId: 'YOUR_FACEBOOK_APP_ID',
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    const initializeLinkedInSDK = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://platform.linkedin.com/in.js';
      script.innerHTML = `api_key: YOUR_LINKEDIN_API_KEY\nauthorize: true`;
      document.head.appendChild(script);
    };

    initializeGoogleOAuth();
    initializeFacebookSDK();
    initializeLinkedInSDK();

    return () => {
      const scripts = document.getElementsByTagName('script');
      [...scripts].forEach(script => {
        if (
          script.src.includes('accounts.google.com') ||
          script.src.includes('connect.facebook.net') ||
          script.src.includes('platform.linkedin.com')
        ) {
          script.remove();
        }
      });
    };
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);
      setError('');
      console.log('Google login success:', response);
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await new Promise((resolve, reject) => {
        window.FB.login((response) => {
          if (response.authResponse) {
            resolve(response);
          } else {
            reject(new Error('Facebook login failed'));
          }
        }, { scope: 'email,public_profile' });
      });

      const userData = await new Promise((resolve) => {
        window.FB.api('/me', { fields: 'email,name' }, (response) => {
          resolve(response);
        });
      });

      console.log('Facebook login success:', userData);
    } catch (err) {
      setError('Facebook login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      setLoading(true);
      setError('');

      window.IN.User.authorize((response) => {
        if (response.status === 'connected') {
          window.IN.API.Profile('me').fields(['id', 'firstName', 'lastName', 'email-address'])
            .result((profile) => {
              console.log('LinkedIn login success:', profile);
              setLoading(false);
            })
            .error((err) => {
              throw err;
            });
        }
      });
    } catch (err) {
      setError('LinkedIn login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Meta-analysis AI Assistant</h1>
            <p className="text-gray-600 text-lg mt-1">Intelligent Research Synthesis</p>
          </div>
          <p className="text-gray-600 text-center max-w-sm">
            Transform your research workflow with AI-powered systematic review and meta-analysis
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? 'Sign in to continue your research journey'
                : 'Start your meta-analysis journey today'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <Alert className="text-red-500" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input type="email" name="email" placeholder="Email" required 
                  value={formData.email} onChange={handleInputChange}
                  className="input" />
              </div>
              <div>
                <input type="password" name="password" placeholder="Password" required 
                  value={formData.password} onChange={handleInputChange}
                  className="input" />
              </div>
              {!isLogin && (
                <div>
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" required 
                    value={formData.confirmPassword} onChange={handleInputChange}
                    className="input" />
                </div>
              )}
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : isLogin ? 'Log in' : 'Sign up'}
              </button>
            </form>
            <div className="text-center text-gray-500">
              <button onClick={() => setIsLogin(!isLogin)} className="link">
                {isLogin ? 'Create an account' : 'Already have an account?'}
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <button onClick={handleFacebookLogin} className="btn btn-facebook">
              <Facebook className="mr-2" /> Sign in with Facebook
            </button>
            <button onClick={handleLinkedInLogin} className="btn btn-linkedin">
              <Linkedin className="mr-2" /> Sign in with LinkedIn
            </button>
            <button id="googleSignIn" onClick={() => window.google.accounts.id.prompt()} className="btn btn-google">
              <Mail className="mr-2" /> Sign in with Google
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthComponent;
