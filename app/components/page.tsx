import React from 'react';

const GettingStartedPage: React.FC = () => {
  return (
    <div className="container mx-auto">
    

      <div className=" p-2 rounded-lg ">      

        <h2 className="text-4xl font-semibold mb-4 text-white mt-8">Introduction </h2> 
        <hr className="border-neutral-700 mb-6" /> 
        <p className="text-neutral-300 mb-6 leading-relaxed">
        Our goal is to make the <strong>developer experience smooth and fast</strong>. We built Solvibe-UI so developers can directly use this component library and easily integrate essential UI components into their Solana applications. We recognized the need for a collection of readily available, easy-to-integrate UI components that address the common requirements of most Solana projects.        </p>

        <h2 className="text-3xl font-semibold mb-4 text-white mt-8">Essential UI Components at Your Fingertips</h2> 
        <hr className="border-neutral-700 mb-6" /> 
        <p className="text-neutral-300 mb-4 leading-relaxed">
          Solvibe-ui provides developers with a suite of essential UI components, including:
        </p>
        <ul className="list-disc list-inside text-neutral-300 mb-6 pl-4 leading-relaxed">
          <li><strong>Connect Wallet:</strong> A seamless and user-friendly way for users to connect their Solana wallets.</li>
          <li><strong>Transaction Notifications:</strong> Clear and informative feedback to users about the status of their transactions on the Solana network.</li>
          <li>And many other crucial UI components that every project needs.</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4 text-white mt-8">Boosting Developer Experience and User Onboarding</h2> 
        <hr className="border-neutral-700 mb-6" /> {/* Separator */}
        <p className="text-neutral-300 mb-6 leading-relaxed">
          By offering these pre-built and well-designed components, we aim to <strong>make the developer experience 100x better</strong>. Developers can save valuable time and effort by leveraging Solvibe-ui, allowing them to focus on the unique logic and features of their dApps rather than reinventing common UI elements.
        </p>
        <p className="text-neutral-300 leading-relaxed">
          Furthermore, by providing a consistent and familiar set of UI components, Solvibe-ui contributes to the <strong>easy onboarding of new users</strong> to the Solana ecosystem. A predictable and intuitive user interface reduces friction and allows users to interact with Solana dApps confidently, even if they are new to decentralized applications.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-white mt-8">Our Goal</h2> 
        <hr className="border-neutral-700 mb-6" /> {/* Separator */}
        <p className="text-neutral-400 italic leading-relaxed">
         In essence, Solvibe-UI was born out of a desire to lower the barrier to entry for both Solana developers and end-users, fostering a more vibrant and accessible dApp ecosystem.
        </p>
      </div>
    </div>
  );
};

export default GettingStartedPage;