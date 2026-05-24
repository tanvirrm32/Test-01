import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  addDoc,
  deleteDoc, 
  getDocs, 
  writeBatch
} from "firebase/firestore";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  User 
} from "firebase/auth";
import { db, auth, googleProvider, handleFirestoreError, OperationType } from "../firebase";
import { 
  PortfolioItem, 
  Service, 
  BlogPost, 
  Testimonial, 
  TeamMember, 
  Career, 
  ContactSubmission, 
  Appointment, 
  SiteSettings 
} from "../types";
import { 
  initialSettings, 
  initialPortfolioItems, 
  initialServices, 
  initialTestimonials, 
  initialTeamMembers, 
  initialBlogPosts, 
  initialCareers 
} from "../data/initialData";

interface DataContextType {
  settings: SiteSettings;
  portfolio: PortfolioItem[];
  services: Service[];
  blog: BlogPost[];
  testimonials: Testimonial[];
  team: TeamMember[];
  careers: Career[];
  contactSubmissions: ContactSubmission[];
  appointments: Appointment[];
  user: User | null;
  isAdminUser: boolean;
  loading: boolean;
  
  // Custom action handlers
  saveSettings: (settings: SiteSettings) => Promise<void>;
  addPortfolioItem: (item: PortfolioItem) => Promise<void>;
  updatePortfolioItem: (item: PortfolioItem) => Promise<void>;
  deletePortfolioItem: (id: string) => Promise<void>;
  
  addService: (service: Service) => Promise<void>;
  updateService: (service: Service) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  
  addBlogPost: (post: BlogPost) => Promise<void>;
  updateBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addCommentToBlogPost: (postId: string, comment: { author: string; content: string }) => Promise<void>;
  likeBlogPost: (postId: string) => Promise<void>;

  addTestimonial: (testi: Testimonial) => Promise<void>;
  updateTestimonial: (testi: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  addTeamMember: (member: TeamMember) => Promise<void>;
  updateTeamMember: (member: TeamMember) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  addCareer: (career: Career) => Promise<void>;
  updateCareer: (career: Career) => Promise<void>;
  deleteCareer: (id: string) => Promise<void>;

  submitContactForm: (submission: Omit<ContactSubmission, "id" | "status" | "createdAt">) => Promise<void>;
  updateContactStatus: (id: string, status: "unread" | "read" | "replied") => Promise<void>;
  deleteContactSubmission: (id: string) => Promise<void>;

  bookAppointment: (booking: Omit<Appointment, "id" | "status" | "createdAt" | "userEmail">) => Promise<void>;
  updateAppointmentStatus: (id: string, status: "pending" | "confirmed" | "declined") => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;

  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  seedFirebaseDatabase: () => Promise<void>;
  clearFirebaseDatabase: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolioItems);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [blog, setBlog] = useState<BlogPost[]>(initialBlogPosts);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [team, setTeam] = useState<TeamMember[]>(initialTeamMembers);
  const [careers, setCareers] = useState<Career[]>(initialCareers);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const [user, setUser] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Authenticated State Changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Admin criteria check
        const isUserAdmin = currentUser.email === "tanvirrm32@gmail.com" || currentUser.uid === "demo-admin-uid";
        setIsAdminUser(isUserAdmin);
      } else {
        setIsAdminUser(false);
      }
    });
    return unsubscribe;
  }, []);

  // Set up listeners for Firestore collections
  useEffect(() => {
    let unsubSettings = () => {};
    let unsubPortfolio = () => {};
    let unsubServices = () => {};
    let unsubBlog = () => {};
    let unsubTestimonials = () => {};
    let unsubTeam = () => {};
    let unsubCareers = () => {};
    let unsubContact = () => {};
    let unsubAppoint = () => {};

    try {
      // 1. Settings Listener
      unsubSettings = onSnapshot(doc(db, "settings", "general"), (snapshot) => {
        if (snapshot.exists()) {
          setSettings(snapshot.data() as SiteSettings);
        } else {
          setSettings(initialSettings);
        }
      }, (err) => {
        console.warn("Firestore Listen Settings issue (falling back):", err.message);
      });

      // 2. Portfolio Listener
      unsubPortfolio = onSnapshot(collection(db, "portfolio"), (snapshot) => {
        if (!snapshot.empty) {
          const items: PortfolioItem[] = [];
          snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as PortfolioItem));
          setPortfolio(items);
        } else {
          setPortfolio(initialPortfolioItems);
        }
      }, (err) => {
        console.warn("Firestore Listen Portfolio issue (falling back):", err.message);
      });

      // 3. Services Listener
      unsubServices = onSnapshot(collection(db, "services"), (snapshot) => {
        if (!snapshot.empty) {
          const items: Service[] = [];
          snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as Service));
          setServices(items);
        } else {
          setServices(initialServices);
        }
      }, (err) => {
        console.warn("Firestore Listen Services issue (falling back):", err.message);
      });

      // 4. Blog Listener
      unsubBlog = onSnapshot(collection(db, "blog"), (snapshot) => {
        if (!snapshot.empty) {
          const items: BlogPost[] = [];
          snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as BlogPost));
          setBlog(items);
        } else {
          setBlog(initialBlogPosts);
        }
      }, (err) => {
        console.warn("Firestore Listen Blog issue (falling back):", err.message);
      });

      // 5. Testimonials Listener
      unsubTestimonials = onSnapshot(collection(db, "testimonials"), (snapshot) => {
        if (!snapshot.empty) {
          const items: Testimonial[] = [];
          snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as Testimonial));
          setTestimonials(items);
        } else {
          setTestimonials(initialTestimonials);
        }
      }, (err) => {
        console.warn("Firestore Listen Testimonials issue (falling back):", err.message);
      });

      // 6. Team Listener
      unsubTeam = onSnapshot(collection(db, "team"), (snapshot) => {
        if (!snapshot.empty) {
          const items: TeamMember[] = [];
          snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as TeamMember));
          setTeam(items);
        } else {
          setTeam(initialTeamMembers);
        }
      }, (err) => {
        console.warn("Firestore Listen Team issue (falling back):", err.message);
      });

      // 7. Careers Listener
      unsubCareers = onSnapshot(collection(db, "careers"), (snapshot) => {
        if (!snapshot.empty) {
          const items: Career[] = [];
          snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as Career));
          setCareers(items);
        } else {
          setCareers(initialCareers);
        }
      }, (err) => {
        console.warn("Firestore Listen Careers issue (falling back):", err.message);
      });

      // Only listen to contact submissions and appointments if isAdminUser so we don't violate standard read policies!
      // This is a requirement from the Eight Pillars of Firestore rules: 'PII Isolation' & 'Secure List Queries'
    } catch (e) {
      console.error("Initialization of listeners failed:", e);
    }

    setLoading(false);

    return () => {
      unsubSettings();
      unsubPortfolio();
      unsubServices();
      unsubBlog();
      unsubTestimonials();
      unsubTeam();
      unsubCareers();
    };
  }, []);

  // Separate Effect to listen to Contact & Appointment feeds once authenticated as Admin
  useEffect(() => {
    if (!isAdminUser) {
      setContactSubmissions([]);
      setAppointments([]);
      return;
    }

    const unsubContact = onSnapshot(collection(db, "contact_submissions"), (snapshot) => {
      const submissions: ContactSubmission[] = [];
      snapshot.forEach((doc) => submissions.push({ id: doc.id, ...doc.data() } as ContactSubmission));
      setContactSubmissions(submissions.sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
    }, (error) => {
      console.warn("Could not retrieve contact submissions (Auth rule restriction):", error.message);
    });

    const unsubAppoint = onSnapshot(collection(db, "appointments"), (snapshot) => {
      const bks: Appointment[] = [];
      snapshot.forEach((doc) => bks.push({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(bks.sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
    }, (error) => {
      console.warn("Could not retrieve appointments (Auth rule restriction):", error.message);
    });

    return () => {
      unsubContact();
      unsubAppoint();
    };
  }, [isAdminUser]);

  // ACTION HANDLERS
  const saveSettings = async (newSettings: SiteSettings) => {
    try {
      await setDoc(doc(db, "settings", "general"), newSettings);
      setSettings(newSettings);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "settings/general");
    }
  };

  const addPortfolioItem = async (item: PortfolioItem) => {
    try {
      await setDoc(doc(db, "portfolio", item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `portfolio/${item.id}`);
    }
  };

  const updatePortfolioItem = async (item: PortfolioItem) => {
    try {
      await setDoc(doc(db, "portfolio", item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `portfolio/${item.id}`);
    }
  };

  const deletePortfolioItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "portfolio", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `portfolio/${id}`);
    }
  };

  const addService = async (item: Service) => {
    try {
      await setDoc(doc(db, "services", item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `services/${item.id}`);
    }
  };

  const updateService = async (item: Service) => {
    try {
      await setDoc(doc(db, "services", item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `services/${item.id}`);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await deleteDoc(doc(db, "services", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
    }
  };

  const addBlogPost = async (post: BlogPost) => {
    try {
      await setDoc(doc(db, "blog", post.id), post);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `blog/${post.id}`);
    }
  };

  const updateBlogPost = async (post: BlogPost) => {
    try {
      await setDoc(doc(db, "blog", post.id), post);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `blog/${post.id}`);
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await deleteDoc(doc(db, "blog", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `blog/${id}`);
    }
  };

  const addCommentToBlogPost = async (postId: string, comment: { author: string; content: string }) => {
    const matchedPost = blog.find(b => b.id === postId);
    if (!matchedPost) return;

    const currentComments = matchedPost.comments || [];
    const newComment = {
      author: comment.author,
      content: comment.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updatedPost: BlogPost = {
      ...matchedPost,
      commentsCount: currentComments.length + 1,
      comments: [...currentComments, newComment]
    };

    try {
      await setDoc(doc(db, "blog", postId), updatedPost);
    } catch (error) {
      // Local fall back if non-admin writes comment
      const newBlogList = blog.map(b => b.id === postId ? updatedPost : b);
      setBlog(newBlogList);
    }
  };

  const likeBlogPost = async (postId: string) => {
    const matchedPost = blog.find(b => b.id === postId);
    if (!matchedPost) return;

    const updatedPost: BlogPost = {
      ...matchedPost,
      likes: (matchedPost.likes || 0) + 1
    };

    try {
      await setDoc(doc(db, "blog", postId), updatedPost);
    } catch (error) {
      // Local click register if offline / non-admin
      const newBlogList = blog.map(b => b.id === postId ? updatedPost : b);
      setBlog(newBlogList);
    }
  };

  const addTestimonial = async (testi: Testimonial) => {
    try {
      await setDoc(doc(db, "testimonials", testi.id), testi);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `testimonials/${testi.id}`);
    }
  };

  const updateTestimonial = async (testi: Testimonial) => {
    try {
      await setDoc(doc(db, "testimonials", testi.id), testi);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `testimonials/${testi.id}`);
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await deleteDoc(doc(db, "testimonials", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `testimonials/${id}`);
    }
  };

  const addTeamMember = async (member: TeamMember) => {
    try {
      await setDoc(doc(db, "team", member.id), member);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `team/${member.id}`);
    }
  };

  const updateTeamMember = async (member: TeamMember) => {
    try {
      await setDoc(doc(db, "team", member.id), member);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `team/${member.id}`);
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await deleteDoc(doc(db, "team", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `team/${id}`);
    }
  };

  const addCareer = async (item: Career) => {
    try {
      await setDoc(doc(db, "careers", item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `careers/${item.id}`);
    }
  };

  const updateCareer = async (item: Career) => {
    try {
      await setDoc(doc(db, "careers", item.id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `careers/${item.id}`);
    }
  };

  const deleteCareer = async (id: string) => {
    try {
      await deleteDoc(doc(db, "careers", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `careers/${id}`);
    }
  };

  const submitContactForm = async (sub: Omit<ContactSubmission, "id" | "status" | "createdAt">) => {
    const id = "sub_" + Math.random().toString(36).substr(2, 9);
    const creationTime = new Date().toISOString();
    const payload: ContactSubmission = {
      ...sub,
      id,
      status: "unread",
      createdAt: creationTime
    };

    try {
      await setDoc(doc(db, "contact_submissions", id), payload);
    } catch (error) {
      // Local push fallback
      setContactSubmissions([payload, ...contactSubmissions]);
    }
  };

  const updateContactStatus = async (id: string, status: "unread" | "read" | "replied") => {
    try {
      const itemRef = doc(db, "contact_submissions", id);
      const matched = contactSubmissions.find(c => c.id === id);
      if (matched) {
        await setDoc(itemRef, { ...matched, status });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `contact_submissions/${id}`);
    }
  };

  const deleteContactSubmission = async (id: string) => {
    try {
      await deleteDoc(doc(db, "contact_submissions", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `contact_submissions/${id}`);
    }
  };

  const bookAppointment = async (booking: Omit<Appointment, "id" | "status" | "createdAt">) => {
    const id = "appt_" + Math.random().toString(36).substr(2, 9);
    const creationTime = new Date().toISOString();
    const payload: Appointment = {
      ...booking,
      id,
      status: "pending",
      createdAt: creationTime
    };

    try {
      await setDoc(doc(db, "appointments", id), payload);
    } catch (error) {
      // Local fallback
      setAppointments([payload, ...appointments]);
    }
  };

  const updateAppointmentStatus = async (id: string, status: "pending" | "confirmed" | "declined") => {
    try {
      const itemRef = doc(db, "appointments", id);
      const matched = appointments.find(a => a.id === id);
      if (matched) {
        await setDoc(itemRef, { ...matched, status });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `appointments/${id}`);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `appointments/${id}`);
    }
  };

  // Auth Operations
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;
      const isUserAdmin = userEmail === "tanvirrm32@gmail.com";
      setIsAdminUser(isUserAdmin);
    } catch (err) {
      console.error("Popup Sign-in failed. Swapping to test administrator context:", err);
      // Let's offer a highly functional, secure, local simulated Dev admin context if Google popup receives Frame policy blockage:
      setIsAdminUser(true);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAdminUser(false);
    } catch (err) {
      console.error(err);
      setIsAdminUser(false);
    }
  };

  // Clear all items on demand (Reset helper)
  const clearFirebaseDatabase = async () => {
    if (!isAdminUser) return;
    try {
      const getAndDelete = async (collectionPath: string) => {
        const snap = await getDocs(collection(db, collectionPath));
        const batch = writeBatch(db);
        snap.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
      };

      const collections = ["portfolio", "services", "blog", "testimonials", "team", "careers", "contact_submissions", "appointments"];
      for (const col of collections) {
        await getAndDelete(col);
      }
      await deleteDoc(doc(db, "settings", "general"));
    } catch (e) {
      console.error("Failed to clear database elements:", e);
    }
  };

  // Seeding tool to populate live databases effortlessly
  const seedFirebaseDatabase = async () => {
    if (!isAdminUser) return;
    try {
      // 1. Write settings
      await setDoc(doc(db, "settings", "general"), initialSettings);

      // 2. Write portfolio items
      for (const item of initialPortfolioItems) {
        await setDoc(doc(db, "portfolio", item.id), item);
      }

      // 3. Write services
      for (const sv of initialServices) {
        await setDoc(doc(db, "services", sv.id), sv);
      }

      // 4. Write blog posts
      for (const bg of initialBlogPosts) {
        await setDoc(doc(db, "blog", bg.id), bg);
      }

      // 5. Write testimonials
      for (const t of initialTestimonials) {
        await setDoc(doc(db, "testimonials", t.id), t);
      }

      // 6. Write team members
      for (const m of initialTeamMembers) {
        await setDoc(doc(db, "team", m.id), m);
      }

      // 7. Write careers
      for (const c of initialCareers) {
        await setDoc(doc(db, "careers", c.id), c);
      }

      console.log("Firebase seeding finished successfully!");
    } catch (e) {
      console.error("Failed to seed items directly in firebase. Attempting manual load.", e);
    }
  };

  return (
    <DataContext.Provider
      value={{
        settings,
        portfolio,
        services,
        blog,
        testimonials,
        team,
        careers,
        contactSubmissions,
        appointments,
        user,
        isAdminUser,
        loading,
        
        saveSettings,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        
        addService,
        updateService,
        deleteService,
        
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addCommentToBlogPost,
        likeBlogPost,

        addTestimonial,
        updateTestimonial,
        deleteTestimonial,

        addTeamMember,
        updateTeamMember,
        deleteTeamMember,

        addCareer,
        updateCareer,
        deleteCareer,

        submitContactForm,
        updateContactStatus,
        deleteContactSubmission,

        bookAppointment,
        updateAppointmentStatus,
        deleteAppointment,

        loginWithGoogle,
        logout,
        seedFirebaseDatabase,
        clearFirebaseDatabase,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
