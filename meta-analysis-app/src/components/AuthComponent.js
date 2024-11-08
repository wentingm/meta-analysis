import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Facebook, Linkedin, Mail, Lock, Loader, Chrome } from 'lucide-react';

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Initialize OAuth SDKs
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

    // Initialize Facebook SDK
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

    // Initialize LinkedIn SDK
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

    // Cleanup function
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

  // OAuth Response Handlers
  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);
      setError('');
      // Send the response.credential to your backend
      console.log('Google login success:', response);
      // Handle successful login
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

      // Get user profile data
      const userData = await new Promise((resolve) => {
        window.FB.api('/me', { fields: 'email,name' }, (response) => {
          resolve(response);
        });
      });

      console.log('Facebook login success:', userData);
      // Handle successful login
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
              // Handle successful login
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

  // Form handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate password match for signup
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Your authentication logic here
      console.log('Form submitted:', formData);
      
      // Simulate API call
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
        {/* Logo and Branding */}
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
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              )}
              {isLogin && (
                <div className="flex justify-end">
                  <button 
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* OAuth Buttons - Now in a row */}
            <div className="flex justify-center space-x-4">
              {/* Google Sign In Button */}
              <div id="g_id_onload" data-client_id="YOUR_GOOGLE_CLIENT_ID" data-callback="handleGoogleResponse" className="hidden"></div>
              <button
                onClick={() => {
                  window.google?.accounts.id.prompt();
                }}
                disabled={loading}
                className="flex flex-col items-center justify-center p-3 hover:bg-gray-50 rounded-lg border w-20 h-20 transition-colors"
              >
                <Chrome className="h-6 w-6 text-[#4285F4] mb-1" />
                <span className="text-xs text-gray-600">Google</span>
              </button>

              {/* LinkedIn Sign In Button */}
              <button
                onClick={handleLinkedInLogin}
                disabled={loading}
                className="flex flex-col items-center justify-center p-3 hover:bg-gray-50 rounded-lg border w-20 h-20 transition-colors"
              >
                {loading ? (
                  <Loader className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    <Linkedin className="h-6 w-6 text-[#0A66C2] mb-1" />
                    <span className="text-xs text-gray-600">LinkedIn</span>
                  </>
                )}
              </button>

              {/* Facebook Sign In Button */}
              <button
                onClick={handleFacebookLogin}
                disabled={loading}
                className="flex flex-col items-center justify-center p-3 hover:bg-gray-50 rounded-lg border w-20 h-20 transition-colors"
              >
                {loading ? (
                  <Loader className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    <Facebook className="h-6 w-6 text-[#1877F2] mb-1" />
                    <span className="text-xs text-gray-600">Facebook</span>
                  </>
                )}
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:underline"
              disabled={loading}
            >
              {isLogin 
                ? "Don't have an account? Create one" 
                : "Already have an account? Sign in"}
            </button>
          </CardFooter>
        </Card>

        {/* Terms and Privacy */}
        <p className="text-center text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default AuthComponent;
