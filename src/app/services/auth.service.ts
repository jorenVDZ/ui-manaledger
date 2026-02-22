import { Injectable, signal, Signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser = signal<User | null>(null);

  constructor() {
    // Initialize Supabase client with environment variables
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_ANON_KEY
    );

    // Listen for auth state changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this._currentUser.set(session?.user ?? null);
    });

    // Initialize current user
    this.supabase.auth.getSession().then(({ data }) => {
      this._currentUser.set(data.session?.user ?? null);
    });
  }

  get currentUser(): Signal<User | null> {
    return this._currentUser.asReadonly();
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  async getAccessToken(): Promise<string | null> {
    const { data: { session } } = await this.supabase.auth.getSession();
    return session?.access_token ?? null;
  }

  getSupabaseClient(): SupabaseClient {
    return this.supabase;
  }
}
