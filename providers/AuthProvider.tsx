"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "@/config/axios";
import { toast } from "@components/ui/toaster";

export interface UserWallet {
  balance?: number;
  lockedBalance?: number;
}

export interface UserProfileData {
  _id?: string;
  id?: string;
  name?: string;
  mobile?: string;
  countryCode?: string;
  email?: string;
  profileImage?: string;
  fcmToken?: string;
  latitude?: string;
  longitude?: string;
  birthTime?: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  deviceId?: string;
  deviceType?: string;
  status?: boolean;
  isDeleted?: boolean;
  preferredLanguage?: string;
  isProfileComplete?: boolean;
  city?: string;
  placeOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
  zodiacSign?: string | null;
  isHoroSubscription?: boolean;
  horoSubscription?: string | null;
  isWhatsappSubscription?: boolean;
  whatsappSubscription?: string | null;
  wallet?: UserWallet;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfileData | null;
  token: string | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (onSuccessCallback?: () => void) => void;
  closeAuthModal: () => void;
  login: (userData: UserProfileData, token?: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (updatedData: Partial<UserProfileData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authSuccessCallback, setAuthSuccessCallback] = useState<(() => void) | null>(null);

  // Sync auth state from localStorage
  const syncAuthState = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const storedAuth = localStorage.getItem("astroyavi_logged_in") === "true";
      const storedToken =
        localStorage.getItem("astroyavi_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        null;
      const storedUser = localStorage.getItem("astroyavi_user");

      setIsLoggedIn(storedAuth && Boolean(storedToken));
      setToken(storedToken);

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed && typeof parsed === "object") {
            setUser(parsed);
          }
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch latest profile from API if authenticated
  const refreshUser = useCallback(async () => {
    if (typeof window === "undefined") return;

    const currentToken =
      localStorage.getItem("astroyavi_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (!currentToken) return;

    try {
      const headers: Record<string, string> = {
        Authorization: currentToken.startsWith("Bearer ")
          ? currentToken
          : `Bearer ${currentToken}`,
        token: currentToken,
      };

      const res = await axios.get("/profile", { headers });
      if (res?.data) {
        const userObj: UserProfileData =
          res.data.data?.user ||
          res.data.user ||
          res.data.data ||
          res.data;

        if (userObj && typeof userObj === "object") {
          setUser(userObj);
          localStorage.setItem("astroyavi_user", JSON.stringify(userObj));
          const uid = userObj._id || userObj.id;
          if (uid) {
            localStorage.setItem("userId", uid);
            localStorage.setItem("user_id", uid);
          }
        }
      }
    } catch {
      // Ignore background fetch failure
    }
  }, []);

  useEffect(() => {
    syncAuthState();
    refreshUser();

    const handleAuthChange = () => {
      syncAuthState();
      refreshUser();
    };

    window.addEventListener("astroyavi_auth_change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("astroyavi_auth_change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [syncAuthState, refreshUser]);

  const login = useCallback(
    (userData: UserProfileData, userToken?: string) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("astroyavi_logged_in", "true");
        if (userToken) {
          localStorage.setItem("astroyavi_token", userToken);
          localStorage.setItem("token", userToken);
        }
        if (userData) {
          localStorage.setItem("astroyavi_user", JSON.stringify(userData));
          const uid = userData._id || userData.id;
          if (uid) {
            localStorage.setItem("userId", uid);
            localStorage.setItem("user_id", uid);
          }
        }
        window.dispatchEvent(new Event("astroyavi_auth_change"));
      }

      setIsLoggedIn(true);
      setUser(userData);
      if (userToken) setToken(userToken);
      setIsAuthModalOpen(false);

      if (authSuccessCallback) {
        authSuccessCallback();
        setAuthSuccessCallback(null);
      }
    },
    [authSuccessCallback]
  );

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("astroyavi_logged_in");
      localStorage.removeItem("astroyavi_token");
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("astroyavi_user");
      localStorage.removeItem("userId");
      localStorage.removeItem("user_id");
      window.dispatchEvent(new Event("astroyavi_auth_change"));
    }

    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    setIsAuthModalOpen(false);

    toast.success("Logged out successfully", {
      description: "You have been logged out. Redirecting to home...",
    });

    // Automatically navigate to homepage
    router.push("/");
  }, [router]);

  const updateUser = useCallback(
    (updatedData: Partial<UserProfileData>) => {
      setUser((prev) => {
        const merged = prev ? { ...prev, ...updatedData } : (updatedData as UserProfileData);
        if (typeof window !== "undefined") {
          localStorage.setItem("astroyavi_user", JSON.stringify(merged));
        }
        return merged;
      });
    },
    []
  );

  const openAuthModal = useCallback((onSuccessCallback?: () => void) => {
    if (onSuccessCallback) {
      setAuthSuccessCallback(() => onSuccessCallback);
    } else {
      setAuthSuccessCallback(null);
    }
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setAuthSuccessCallback(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        loading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
