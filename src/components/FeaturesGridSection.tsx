import React, { useRef } from 'react';
import { Box, Container, Typography, Grid, Avatar, Button } from '@mui/material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ChatMockup = () => (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mt: 4, mb: 2, background: '#FFFFFF', borderRadius: '12px', border: '1px solid #F3F4F6', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <Box sx={{ display: 'flex', borderBottom: '1px solid #E0E0E0' }}>
            <Box sx={{ flex: 1, p: 1.5, background: '#075E54', textAlign: 'center', borderRight: '1px solid #E0E0E0' }}>
                <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.1em' }}>WHATSAPP</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 1.5, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.1em' }}>INSTAGRAM</Typography>
            </Box>
        </Box>
        <Box sx={{ p: 2, pb: 0, display: 'flex', flexDirection: 'column', gap: 2, background: '#ECE5DD', flexGrow: 1 }}>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', mt: 1 }}>
                <Avatar src="https://i.pravatar.cc/150?img=32" sx={{ width: 24, height: 24, border: '1px solid #fff' }} />
                <Box sx={{ background: '#FFFFFF', color: '#111', p: 1.5, borderRadius: '8px 8px 8px 0', fontSize: '0.8rem', maxWidth: '85%', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                    Hi, I'm looking to book a stay at your resort.
                </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', alignSelf: 'flex-end', maxWidth: '85%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-end' }}>
                    <Box sx={{ background: '#DCF8C6', color: '#111', p: 1.5, borderRadius: '8px 8px 0 8px', fontSize: '0.8rem', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                        <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=300&q=80" alt="Resort" style={{ width: '100%', borderRadius: '4px', marginBottom: '8px', objectFit: 'cover' }} />
                        Hello! 👋 Welcome to Pearl Resort. We'd love to host you. Please select your preferred dates below to check availability.
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        <Box sx={{ background: '#ffffff', color: '#4E5FFD', fontWeight: 600, fontSize: '0.65rem', py: 0.6, px: 1.5, borderRadius: '9999px', cursor: 'pointer', border: '1px solid #4E5FFD' }}>
                            🗓 Next Weekend
                        </Box>
                        <Box sx={{ background: '#4E5FFD', color: '#ffffff', fontWeight: 600, fontSize: '0.65rem', py: 0.6, px: 1.5, borderRadius: '9999px', cursor: 'pointer' }}>
                            🗓 Pick Dates
                        </Box>
                    </Box>
                </Box>
                <Avatar src="https://ui-avatars.com/api/?name=AI&background=4E5FFD&color=fff" sx={{ width: 24, height: 24, border: '1px solid #fff' }} />
            </Box>
        </Box>
        <Box sx={{ p: 1.5, background: '#F0F0F0', borderTop: '1px solid #E0E0E0', display: 'flex', gap: 1, alignItems: 'center', zIndex: 2 }}>
            <Box sx={{ flexGrow: 1, background: '#FFFFFF', borderRadius: '20px', p: 1, px: 2, color: '#888', fontSize: '0.8rem', border: '1px solid #ccc' }}>
                Type a reply...
            </Box>
            <Box sx={{ background: '#4E5FFD', color: '#FFF', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Typography sx={{ fontSize: '1rem', lineHeight: 1, ml: 0.5 }}>➤</Typography>
            </Box>
        </Box>
    </Box>
);

const LeadsMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, p: 2, background: '#FFFFFF', border: '1px solid #F3F4F6', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: 2, position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#4E5FFD', fontWeight: 700 }}>Booking Inquiries</Typography>
            <Typography variant="h6" sx={{ color: '#1A1A2E', fontWeight: 700 }}>+185%</Typography>
        </Box>
        <Box sx={{ height: '60px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderBottom: '1px solid #F3F4F6', pb: '1px' }}>
            {[20, 35, 25, 50, 45, 70, 60, 90, 85, 100].map((h, i) => (
                <Box key={i} sx={{ flex: 1, height: `${h}%`, background: h > 80 ? '#4E5FFD' : 'rgba(78,95,253,0.15)', borderRadius: '2px 2px 0 0', transition: 'all 0.3s' }} />
            ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
            {[
                { name: 'Sarah Jenkins', status: 'Hot Lead', img: 'https://i.pravatar.cc/150?img=5', color: '#4E5FFD' },
                { name: 'Michael T.', status: 'Qualified', img: 'https://i.pravatar.cc/150?img=11', color: '#10B981' },
                { name: 'Jessica R.', status: 'Contacted', img: 'https://i.pravatar.cc/150?img=9', color: '#F59E0B' },
                { name: 'David W.', status: 'New Lead', img: 'https://i.pravatar.cc/150?img=8', color: '#9CA3AF' }
            ].map((lead, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, background: '#F8F7FF', border: '1px solid #F3F4F6', borderRadius: '8px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar src={lead.img} sx={{ width: 30, height: 30 }} />
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#1A1A2E' }}>{lead.name}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: lead.color, fontWeight: 700, fontSize: '0.65rem' }}>● {lead.status}</Typography>
                </Box>
            ))}
        </Box>
    </Box>
);

const InventoryMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, p: 2, background: '#FFFFFF', border: '1px solid #F3F4F6', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: 2, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', pb: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#4E5FFD' }}>Live Inventory</Typography>
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>Sync: Active</Typography>
        </Box>
        {[
            { img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100&q=80', name: 'Silk Evening Gown', stock: 12, max: 50 },
            { img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80', name: 'Diamond Solitaire Ring', stock: 4, max: 20 },
            { img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&q=80', name: 'Vintage Leather Jacket', stock: 25, max: 100 },
            { img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&q=80', name: 'Gold Hoop Earrings', stock: 8, max: 30 }
        ].map((item, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center', background: '#F8F7FF', p: 1, border: '1px solid #F3F4F6', borderRadius: '8px' }}>
                <img src={item.img} alt={item.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '8px' }} />
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ color: '#1A1A2E', fontWeight: 600 }}>{item.name}</Typography>
                        <Typography variant="caption" sx={{ color: item.stock < 20 ? '#FF6B6B' : '#4E5FFD', fontWeight: 700 }}>{item.stock} left</Typography>
                    </Box>
                    <Box sx={{ height: '4px', background: '#E5E7EB', width: '100%', borderRadius: '9999px', overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${(item.stock / item.max) * 100}%`, background: item.stock < 20 ? '#FF6B6B' : '#4E5FFD', borderRadius: '9999px' }} />
                    </Box>
                </Box>
            </Box>
        ))}
    </Box>
);

const WorkflowMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, background: '#fff', borderRadius: '12px', border: '1px solid #F3F4F6', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <Box sx={{ width: '100%', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', p: 1.5, gap: 1.5, background: '#F8F7FF', zIndex: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#FF6B6B', fontWeight: 700, fontSize: '0.45rem' }}>Workflow Name *</Typography>
                <Box sx={{ background: '#fff', border: '1px solid #E5E7EB', p: 0.5, px: 1, borderRadius: '6px', width: '180px' }}>
                    <Typography variant="caption" sx={{ color: '#1A1A2E', fontSize: '0.55rem' }}>Lead Enquiry Flow</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 700, fontSize: '0.45rem' }}>Key</Typography>
                <Box sx={{ background: '#fff', border: '1px solid #E5E7EB', p: 0.5, px: 1, borderRadius: '6px', width: '120px' }}>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.55rem' }}>leadenquiryflow</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, ml: 'auto', flexWrap: 'wrap' }}>
                <Box sx={{ p: 0.5, px: 1, background: '#E5E7EB', color: '#374151', borderRadius: '6px', height: '20px', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 600 }}>Update</Typography>
                </Box>
                <Box sx={{ p: 0.5, px: 1, background: '#4E5FFD', color: '#fff', borderRadius: '6px', height: '20px', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 600 }}>Permissions</Typography>
                </Box>
                <Box sx={{ p: 0.5, px: 1, background: '#4E5FFD', color: '#fff', borderRadius: '6px', height: '20px', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 600 }}>Variables</Typography>
                </Box>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative', height: '100%', minHeight: '350px' }}>
            <Box sx={{ width: '140px', borderRight: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4px', p: 1, zIndex: 2, background: '#fff', overflowY: 'auto', alignContent: 'start' }}>
                {[
                    { i: '▶', c: '#10B981', t: 'Start Task' }, { i: '⏹', c: '#FF6B6B', t: 'End Task' },
                    { i: '👤', c: '#F59E0B', t: 'User Task' }, { i: '✓', c: '#4E5FFD', t: 'Approval Task' },
                    { i: '📄', c: '#9CA3AF', t: 'Invoice Task' }, { i: '🤖', c: '#7B3FE4', t: 'AI Task' },
                    { i: '🔀', c: '#FF6B6B', t: 'Decision Task' }, { i: '📊', c: '#6B7280', t: 'Decision Table' },
                    { i: '🌐', c: '#06B6D4', t: 'Web Service' }, { i: '✉', c: '#F59E0B', t: 'Email Task' },
                    { i: '⏳', c: '#F97316', t: 'Delay Timer' }, { i: '🗄', c: '#4E5FFD', t: 'DB Task' },
                ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0.5, border: '1px solid #F3F4F6', borderRadius: '8px', background: '#fff', cursor: 'grab', height: '40px' }}>
                        <Typography variant="caption" sx={{ fontSize: '0.8rem', color: item.c, lineHeight: 1 }}>{item.i}</Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.35rem', color: '#6B7280', textAlign: 'center', mt: 0.5, fontWeight: 600 }}>{item.t}</Typography>
                    </Box>
                ))}
            </Box>
            <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#fff' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(#F3F4F6 1px, transparent 1px), linear-gradient(90deg, #F3F4F6 1px, transparent 1px)', backgroundSize: '15px 15px', zIndex: 0 }} />
                <Box sx={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: 1 }}>
                    <Box sx={{ position: 'absolute', top: 30, left: 20, background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', width: '120px', boxShadow: '0 4px 12px rgba(78,95,253,0.08)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.5, px: 1, background: '#F8F7FF', borderBottom: '1px solid #F3F4F6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#10B981' }}>▶</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 700, color: '#1A1A2E', flexGrow: 1 }}>START_TASK</Typography>
                            <Box sx={{ width: 10, height: 10, background: '#4E5FFD', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ background: '#F8F7FF', p: 0.5, border: '1px solid #F3F4F6', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ fontSize: '0.45rem', color: '#374151' }}>Lead Received</Typography>
                                <Box sx={{ width: 10, height: 10, background: '#4E5FFD', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#10B981', background: '#ECFDF5', px: 0.5, py: 0.2, borderRadius: '4px' }}>Connected ●</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <svg style={{ position: 'absolute', top: 75, left: 140, width: 40, height: 20, zIndex: 0, overflow: 'visible' }}>
                        <path d="M 0 0 C 20 0, 20 20, 40 20" fill="none" stroke="#4E5FFD" strokeWidth="1.5" />
                        <polygon points="40,20 34,17 34,23" fill="#4E5FFD" />
                    </svg>
                    <Box sx={{ position: 'absolute', top: 60, left: 180, background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', width: '120px', boxShadow: '0 4px 12px rgba(78,95,253,0.08)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.5, px: 1, background: '#F8F7FF', borderBottom: '1px solid #F3F4F6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#7B3FE4' }}>🤖</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 700, color: '#1A1A2E', flexGrow: 1 }}>AI Task</Typography>
                            <Box sx={{ width: 10, height: 10, background: '#4E5FFD', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ background: '#F8F7FF', p: 0.5, border: '1px solid #F3F4F6', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ fontSize: '0.45rem', color: '#374151' }}>Qualify Lead</Typography>
                                <Box sx={{ width: 10, height: 10, background: '#4E5FFD', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 1, gap: 0.5 }}>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#10B981', background: '#ECFDF5', px: 0.5, py: 0.2, borderRadius: '4px' }}>Hot Lead ●</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#F59E0B', background: '#FFFBEB', px: 0.5, py: 0.2, borderRadius: '4px' }}>Cold Lead ●</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <svg style={{ position: 'absolute', top: 115, left: 300, width: 30, height: 20, zIndex: 0, overflow: 'visible' }}>
                        <path d="M 0 0 C 15 0, 15 -30, 30 -30" fill="none" stroke="#4E5FFD" strokeWidth="1.5" />
                        <polygon points="30,-30 24,-33 24,-27" fill="#4E5FFD" />
                    </svg>
                    <svg style={{ position: 'absolute', top: 130, left: 300, width: 30, height: 40, zIndex: 0, overflow: 'visible' }}>
                        <path d="M 0 0 C 15 0, 15 30, 30 30" fill="none" stroke="#4E5FFD" strokeWidth="1.5" />
                        <polygon points="30,30 24,27 24,33" fill="#4E5FFD" />
                    </svg>
                    <Box sx={{ position: 'absolute', top: 50, left: 330, background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', width: '120px', boxShadow: '0 4px 12px rgba(78,95,253,0.08)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.5, px: 1, background: '#F8F7FF', borderBottom: '1px solid #F3F4F6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#F59E0B' }}>👤</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 700, color: '#1A1A2E', flexGrow: 1 }}>User Task</Typography>
                            <Box sx={{ width: 10, height: 10, background: '#4E5FFD', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ background: '#F8F7FF', p: 0.5, border: '1px solid #F3F4F6', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ fontSize: '0.45rem', color: '#374151' }}>Agent Call</Typography>
                                <Box sx={{ width: 10, height: 10, background: '#4E5FFD', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#10B981', background: '#ECFDF5', px: 0.5, py: 0.2, borderRadius: '4px' }}>Connected ●</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ position: 'absolute', top: 135, left: 330, background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', width: '120px', boxShadow: '0 4px 12px rgba(78,95,253,0.08)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.5, px: 1, background: '#F8F7FF', borderBottom: '1px solid #F3F4F6', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#F59E0B' }}>✉</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 700, color: '#1A1A2E', flexGrow: 1 }}>Email Task</Typography>
                            <Box sx={{ width: 10, height: 10, background: '#4E5FFD', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ background: '#F8F7FF', p: 0.5, border: '1px solid #F3F4F6', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ fontSize: '0.45rem', color: '#374151' }}>Nurture Campaign</Typography>
                                <Box sx={{ width: 10, height: 10, background: '#4E5FFD', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#10B981', background: '#ECFDF5', px: 0.5, py: 0.2, borderRadius: '4px' }}>Connected ●</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
);

const PaymentMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, p: 2, background: '#fff', borderRadius: '12px', border: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: 2, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <Box sx={{ p: 2, background: '#F8F7FF', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>Order #4409 Total</Typography>
            <Typography variant="h3" sx={{ color: '#1A1A2E', fontWeight: 900 }}>₹14,000</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #F3F4F6' }}>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>Studio Headphones</Typography>
                <Typography variant="caption" sx={{ color: '#1A1A2E', fontWeight: 600 }}>₹12,000</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #F3F4F6' }}>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>Shipping</Typography>
                <Typography variant="caption" sx={{ color: '#1A1A2E', fontWeight: 600 }}>₹2,000</Typography>
            </Box>
        </Box>
        <Button variant="contained" sx={{ mt: 'auto', background: '#4E5FFD', color: '#fff', fontWeight: 600, borderRadius: '9999px', textTransform: 'none', py: 1.5, boxShadow: 'none', '&:hover': { background: '#3A4AE8', boxShadow: 'none' } }}>
            Pay securely now
        </Button>
    </Box>
);

const AnalyticsMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, p: 2, background: '#FFFFFF', border: '1px solid #F3F4F6', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: 2, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#4E5FFD', fontWeight: 700 }}>Auto-testimonial</Typography>
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>Verified</Typography>
        </Box>
        <Box sx={{ p: 2, background: '#F8F7FF', borderRadius: '12px', border: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar src="https://i.pravatar.cc/150?img=47" sx={{ width: 40, height: 40 }} />
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1A1A2E', lineHeight: 1 }}>Emma Carter</Typography>
                    <Typography variant="caption" sx={{ color: '#F59E0B', fontSize: '1rem', letterSpacing: '2px' }}>★★★★★</Typography>
                </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#374151', fontStyle: 'italic', mt: 1, fontSize: '0.85rem' }}>
                "Absolutely incredible experience! The AI handled everything seamlessly. The trip booking and the checkout process via WhatsApp was magical."
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Box component="img" src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=100&q=80" sx={{ width: 60, height: 60, borderRadius: '8px', objectFit: 'cover' }} />
                <Box component="img" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=80" sx={{ width: 60, height: 60, borderRadius: '8px', objectFit: 'cover' }} />
            </Box>
        </Box>
    </Box>
);

const featuresData = [
    { title: 'Omnichannel Chat UI', number: '01', desc: 'Centralize WhatsApp, Instagram, and Web chats in one unified human-like inbox.', speed: 0.1, mockup: 'chat' },
    { title: 'Live Lead Tracking', number: '02', desc: 'Auto-capture client details, monitor metrics, and qualify event leads visually.', speed: 0.25, mockup: 'leads' },
    { title: 'Product Inventory', number: '03', desc: 'Real-time sync of product inventory, variants, and stock availability directly in chat.', speed: 0.15, mockup: 'inventory' },
    { title: 'Visual Workflow Builder', number: '04', desc: 'Automate event enquiries without messy group chats or broadcast lists.', speed: 0.3, mockup: 'workflow' },
    { title: 'Native Payments', number: '05', desc: 'Securely collect ticket fees and slot booking payments inside the chat.', speed: 0.2, mockup: 'payments' },
    { title: 'Automated Reviews', number: '06', desc: 'Chatbot asks attendees for photos and reviews, securely syncing them to your website widget.', speed: 0.35, mockup: 'analytics' },
];

const renderMockup = (type: string) => {
    switch (type) {
        case 'chat': return <ChatMockup />;
        case 'leads': return <LeadsMockup />;
        case 'inventory': return <InventoryMockup />;
        case 'workflow': return <WorkflowMockup />;
        case 'payments': return <PaymentMockup />;
        case 'analytics': return <AnalyticsMockup />;
        default: return null;
    }
}

const FeatureCard = ({ feature, index, scrollYProgress }: any) => {
    const yTransform = useTransform(scrollYProgress, [0, 1], [100, -200 * feature.speed]);
    const smoothY = useSpring(yTransform, { stiffness: 400, damping: 90 });
    const isEven = index % 2 === 0;

    return (
        <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { md: isEven ? 0 : 8 }, mb: { xs: 4, md: 0 } }}>
            <motion.div
                style={{
                    y: smoothY,
                    minHeight: '450px',
                    height: '100%',
                    backgroundColor: '#ffffff',
                    color: '#1A1A2E',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid #F3F4F6',
                    borderRadius: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
                whileHover={{
                    scale: 0.98,
                    boxShadow: '0 12px 40px rgba(78,95,253,0.12)',
                    borderColor: '#4E5FFD',
                    transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '6rem', md: '7rem' },
                        position: 'absolute',
                        top: '-10px',
                        right: '-5px',
                        WebkitTextStroke: '1px rgba(78, 95, 253, 0.08)',
                        color: 'transparent',
                        userSelect: 'none',
                        lineHeight: 1,
                    }}
                >
                    {feature.number}
                </Typography>

                <Box sx={{ zIndex: 1, position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography variant="overline" sx={{ color: '#4E5FFD', letterSpacing: '0.06em', fontWeight: 600, fontSize: '0.75rem' }}>
                        Capability {feature.number}
                    </Typography>
                    <Typography variant="h3" sx={{ mt: 1.5, mb: 0, fontWeight: 700, fontSize: { xs: '1.25rem', md: '1.75rem' }, lineHeight: 1.25, color: '#1A1A2E', letterSpacing: '-0.01em' }}>
                        {feature.title}
                    </Typography>

                    {renderMockup(feature.mockup)}
                </Box>

                <Box sx={{ zIndex: 1, position: 'relative', mt: 'auto' }}>
                    <Box sx={{ width: '32px', height: '3px', background: '#4E5FFD', borderRadius: '9999px', mb: 2.5 }} />
                    <Typography sx={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        {feature.desc}
                    </Typography>
                </Box>
            </motion.div>
        </Grid>
    );
};

const FeaturesGridSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    return (
        <Box
            ref={sectionRef}
            id="features"
            sx={{
                py: { xs: 10, md: 24 },
                background: '#F8F7FF',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '1px solid #F3F4F6',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 10, md: 16 } }}>
                    <Typography
                        sx={{ color: '#4E5FFD', fontWeight: 600, fontSize: '0.85rem', mb: 2, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}
                    >
                        Core Infrastructure
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            color: '#1A1A2E',
                            fontWeight: 700,
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Everything you need
                        <Box sx={{ display: 'block', fontWeight: 400, fontStyle: 'italic', color: '#6B7280', mt: 0.5, fontSize: { xs: '2rem', md: '3rem' } }}>
                            to scale.
                        </Box>
                    </Typography>
                </Box>

                <Grid container spacing={4} sx={{ mt: { md: 10 } }}>
                    {featuresData.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FeaturesGridSection;
