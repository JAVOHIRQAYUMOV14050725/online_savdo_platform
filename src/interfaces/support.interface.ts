
 interface SupportRequest {
    userId: string;
    question: string;
    status: 'new' | 'responded' | 'closed';
    createdAt: Date;
  }
  
 interface SupportResponse {
    requestId: string;
    response: string;
    respondedAt: Date;
  }
  
  export {SupportRequest, SupportResponse }