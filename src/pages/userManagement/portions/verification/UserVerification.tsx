import React, { useState } from 'react';
import { CheckCircle2, X, Loader2 } from 'lucide-react';
import VerifyModal from '../../../verification/components/VerifyModal';
import { useLocation, useParams } from 'react-router-dom';
import HeaderWrapper from '../../components/HeaderWrapper';
import { useGetUserByUsername } from '../../../../utils/queries/userQueries';
import { useGetVerificationByUser } from '../../../../utils/queries/verificationQueries';
import { storageUrl, avatarUrl } from '../../../../constants/help';

const UserVerification: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const location = useLocation();
    const [activeTab, setactiveTab] = useState('all');
    const [isEditModal, setIsEditModal] = useState(false);

    const { data: user, isLoading: userLoading } = useGetUserByUsername(username ?? '');
    const userId = user?.id?.toString() ?? '';
    const { data: verification, isLoading: verLoading, refetch } = useGetVerificationByUser(userId);

    const isLoading = userLoading || verLoading;

    return (
        <HeaderWrapper
            location={location}
            user={username}
            activeTab={activeTab}
            setActiveTab={setactiveTab}
        >
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
                        </div>
                    ) : !verification ? (
                        <div className="bg-red-900 rounded-3xl p-12 text-center">
                            <p className="text-red-200 text-lg">No verification record found for this user.</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-red-900 rounded-3xl overflow-hidden">
                                <div className="grid grid-cols-[300px_1fr_400px] gap-6 p-8">
                                    {/* Left Section - Profile Info */}
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <img
                                                src={
                                                    avatarUrl(verification.profilePicture, verification.userName)
                                                }
                                                alt={verification.userName}
                                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                            />
                                            {verification.status === 'approved' ? (
                                                <CheckCircle2 className="w-6 h-6 text-green-500 absolute bottom-4 right-0" />
                                            ) : (
                                                <X className="w-6 h-6 text-red-500 absolute bottom-4 right-0" />
                                            )}
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-1">
                                            {verification.businessName}
                                        </h2>
                                        <p className="text-red-200 mb-4">{verification.category}</p>
                                        <p className="text-red-300 text-sm mb-6 capitalize">
                                            {verification.status}
                                        </p>
                                        <button
                                            onClick={() => setIsEditModal(true)}
                                            className="bg-white text-red-600 px-8 py-2 rounded-full font-semibold hover:bg-red-50 transition-colors"
                                        >
                                            View
                                        </button>
                                    </div>

                                    {/* Middle Section - Business Info */}
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-red-200 text-sm">Business Name</p>
                                            <p className="text-white font-semibold">{verification.businessName}</p>
                                        </div>
                                        <div>
                                            <p className="text-red-200 text-sm">Business Category</p>
                                            <p className="text-white font-semibold">{verification.category}</p>
                                        </div>
                                        <div>
                                            <p className="text-red-200 text-sm">Business Email</p>
                                            <p className="text-white font-semibold">
                                                {verification.businessEmail || verification.userEmail || '—'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-red-200 text-sm">Phone no</p>
                                            <p className="text-white font-semibold">
                                                {verification.businessPhone || verification.userPhone || '—'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Section - Certificate */}
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-red-200 text-sm">Certificate Image</p>
                                            <div className="mt-2 bg-white rounded-lg p-4 w-full">
                                                {verification.photo ? (
                                                    <img
                                                        src={storageUrl(verification.photo) || ''}
                                                        alt="Certificate"
                                                        className="w-20 h-auto rounded block mx-auto"
                                                    />
                                                ) : (
                                                    <p className="text-gray-400 text-sm text-center">No certificate uploaded</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <VerifyModal
                                isOpen={isEditModal}
                                onClose={() => setIsEditModal(false)}
                                onSuccess={() => { setIsEditModal(false); refetch(); }}
                                business={{
                                    id: verification.id,
                                    businessName: verification.businessName,
                                    category: verification.category,
                                    email: verification.businessEmail || verification.userEmail,
                                    phone: verification.businessPhone || verification.userPhone,
                                    document: storageUrl(verification.photo) || '',
                                    status: verification.status,
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </HeaderWrapper>
    );
};

export default UserVerification;
