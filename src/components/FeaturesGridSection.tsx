import React, { useRef } from 'react';
import { Box, Container, Typography, Grid, Avatar, Button } from '@mui/material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Mockup 1: WhatsApp & Instagram Chat UI with Human Avatars
const ChatMockup = () => (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mt: 4, mb: 2, background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', borderBottom: '1px solid #E0E0E0' }}>
            <Box sx={{ flex: 1, p: 1.5, background: '#075E54', textAlign: 'center', borderRight: '1px solid #E0E0E0' }}>
                <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.1em' }}>WHATSAPP</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 1.5, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.1em' }}>INSTAGRAM</Typography>
            </Box>
        </Box>
        {/* Chat Body */}
        <Box sx={{ p: 2, pb: 0, display: 'flex', flexDirection: 'column', gap: 2, background: '#ECE5DD', flexGrow: 1 }}>

            {/* User Enquiry */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', mt: 1 }}>
                <Avatar src="https://i.pravatar.cc/150?img=32" sx={{ width: 24, height: 24, border: '1px solid #fff' }} />
                <Box sx={{ background: '#FFFFFF', color: '#111', p: 1.5, borderRadius: '8px 8px 8px 0', fontSize: '0.8rem', maxWidth: '85%', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                    Hi, I'm looking to book a stay at your resort.
                </Box>
            </Box>

            {/* AI/Agent Response */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', alignSelf: 'flex-end', maxWidth: '85%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-end' }}>
                    <Box sx={{ background: '#DCF8C6', color: '#111', p: 1.5, borderRadius: '8px 8px 0 8px', fontSize: '0.8rem', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                        <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=300&q=80" alt="Resort" style={{ width: '100%', borderRadius: '4px', marginBottom: '8px', objectFit: 'cover' }} />
                        Hello! 👋 Welcome to Pearl Resort. We'd love to host you. Please select your preferred dates below to check availability.
                    </Box>
                    {/* Interactive Quick Reply Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        <Box sx={{ background: '#FFFFFF', color: '#2563EB', fontWeight: 600, fontSize: '0.65rem', py: 0.6, px: 1.5, borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', cursor: 'pointer', border: '1px solid #E0E0E0' }}>
                            🗓 Next Weekend
                        </Box>
                        <Box sx={{ background: '#2563EB', color: '#FFFFFF', fontWeight: 600, fontSize: '0.65rem', py: 0.6, px: 1.5, borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                            🗓 Pick Dates
                        </Box>
                    </Box>
                </Box>
                <Avatar src="https://ui-avatars.com/api/?name=AI&background=00CEBB&color=fff" sx={{ width: 24, height: 24, border: '1px solid #fff' }} />
            </Box>

        </Box>

        {/* Reply Input Area */}
        <Box sx={{ p: 1.5, background: '#F0F0F0', borderTop: '1px solid #E0E0E0', display: 'flex', gap: 1, alignItems: 'center', zIndex: 2 }}>
            <Box sx={{ flexGrow: 1, background: '#FFFFFF', borderRadius: '20px', p: 1, px: 2, color: '#888', fontSize: '0.8rem', border: '1px solid #ccc' }}>
                Type a reply...
            </Box>
            <Box sx={{ background: '#2563EB', color: '#FFF', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(37,99,235,0.4)' }}>
                <Typography sx={{ fontSize: '1rem', lineHeight: 1, ml: 0.5 }}>➤</Typography>
            </Box>
        </Box>
    </Box>
);

// Mockup 2: Lead Chart Design with Humans
const LeadsMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, p: 2, background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: 2, position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 700, letterSpacing: '0.1em' }}>BOOKING INQUIRIES</Typography>
            <Typography variant="h6" sx={{ color: '#0A0A0A', fontWeight: 900 }}>+185%</Typography>
        </Box>

        {/* Simple CSS Chart */}
        <Box sx={{ height: '60px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderBottom: '1px solid #E0E0E0', pb: '1px' }}>
            {[20, 35, 25, 50, 45, 70, 60, 90, 85, 100].map((h, i) => (
                <Box key={i} sx={{ flex: 1, height: `${h}%`, background: h > 80 ? '#2563EB' : '#E0E0E0', transition: 'all 0.3s' }} />
            ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
            {[
                { name: 'Sarah Jenkins', status: 'HOT LEAD', img: 'https://i.pravatar.cc/150?img=5', color: '#2563EB' },
                { name: 'Michael T.', status: 'QUALIFIED', img: 'https://i.pravatar.cc/150?img=11', color: '#25D366' },
                { name: 'Jessica R.', status: 'CONTACTED', img: 'https://i.pravatar.cc/150?img=9', color: '#F5A623' },
                { name: 'David W.', status: 'NEW LEAD', img: 'https://i.pravatar.cc/150?img=8', color: '#888888' }
            ].map((lead, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, background: '#F8F9FA', border: '1px solid #E0E0E0', borderRadius: '8px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar src={lead.img} sx={{ width: 30, height: 30 }} />
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#0A0A0A' }}>{lead.name}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: lead.color, fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.05em' }}>● {lead.status}</Typography>
                </Box>
            ))}
        </Box>
    </Box>
);

// Mockup 3: Inventory UI Design
const InventoryMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, p: 2, background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E0E0E0', pb: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.1em', color: '#2563EB' }}>LIVE INVENTORY</Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>SYNC: ACTIVE</Typography>
        </Box>

        {[
            { img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100&q=80', name: 'Silk Evening Gown', stock: 12, max: 50 },
            { img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80', name: 'Diamond Solitaire Ring', stock: 4, max: 20 },
            { img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&q=80', name: 'Vintage Leather Jacket', stock: 25, max: 100 },
            { img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&q=80', name: 'Gold Hoop Earrings', stock: 8, max: 30 }
        ].map((item, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center', background: '#F8F9FA', p: 1, border: '1px solid #E0E0E0', borderRadius: '8px' }}>
                <img src={item.img} alt={item.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '4px' }} />
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ color: '#0A0A0A', fontWeight: 600 }}>{item.name}</Typography>
                        <Typography variant="caption" sx={{ color: item.stock < 20 ? '#d32f2f' : '#2563EB', fontWeight: 700 }}>{item.stock} LEFT</Typography>
                    </Box>
                    <Box sx={{ height: '4px', background: '#E0E0E0', width: '100%', borderRadius: '2px', overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${(item.stock / item.max) * 100}%`, background: item.stock < 20 ? '#d32f2f' : '#2563EB' }} />
                    </Box>
                </Box>
            </Box>
        ))}
    </Box>
);

// Mockup 4: Tree-like Drag & Drop WhatsApp Flow Builder
// Mockup 4: Complex Workflow Builder mapped to ref image
const WorkflowMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>

        {/* Top Navbar */}
        <Box sx={{ width: '100%', borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', p: 1.5, gap: 1.5, background: '#f5f5f5', zIndex: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 700, fontSize: '0.45rem' }}>Workflow Name *</Typography>
                <Box sx={{ background: '#fff', border: '1px solid #ccc', p: 0.5, px: 1, borderRadius: 1, width: '180px' }}>
                    <Typography variant="caption" sx={{ color: '#333', fontSize: '0.55rem' }}>Lead Enquiry Flow</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#333', fontWeight: 700, fontSize: '0.45rem' }}>Key</Typography>
                <Box sx={{ background: '#fff', border: '1px solid #ccc', p: 0.5, px: 1, borderRadius: 1, width: '120px' }}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: '0.55rem' }}>leadenquiryflow</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, ml: 'auto', flexWrap: 'wrap' }}>
                <Box sx={{ p: 0.5, px: 1, background: '#e0e0e0', color: '#333', borderRadius: 1, height: '20px', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 600 }}>Update</Typography>
                </Box>
                <Box sx={{ p: 0.5, px: 1, background: '#4527a0', color: '#fff', borderRadius: 1, height: '20px', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 600 }}>User Permissions</Typography>
                </Box>
                <Box sx={{ p: 0.5, px: 1, background: '#4527a0', color: '#fff', borderRadius: 1, height: '20px', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 600 }}>Variables</Typography>
                </Box>
            </Box>
        </Box>

        <Box sx={{ display: 'flex', flexGrow: 1, position: 'relative', height: '100%', minHeight: '350px' }}>
            {/* Sidebar Tools (Icons) */}
            <Box sx={{ width: '140px', borderRight: '1px solid #E0E0E0', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4px', p: 1, zIndex: 2, background: '#fff', overflowY: 'auto', alignContent: 'start' }}>
                {[
                    { i: '▶', c: '#8bc34a', t: 'Start Task' }, { i: '⏹', c: '#d32f2f', t: 'End Task' },
                    { i: '👤', c: '#ff9800', t: 'User Task' }, { i: '✓', c: '#03a9f4', t: 'Approval Task' },
                    { i: '📄', c: '#9e9e9e', t: 'Invoice Task' }, { i: '🤖', c: '#9c27b0', t: 'AI Task' },
                    { i: '🔀', c: '#f44336', t: 'Decision Task' }, { i: '📊', c: '#607d8b', t: 'Decision Table' },
                    { i: '🌐', c: '#00bcd4', t: 'Web Service' }, { i: '✉', c: '#ffc107', t: 'Email Task' },
                    { i: '⏳', c: '#ff5722', t: 'Delay Timer' }, { i: '🗄', c: '#3f51b5', t: 'DB Task' },
                ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0.5, border: '1px solid #eee', borderRadius: 1, background: '#fff', cursor: 'grab', height: '40px' }}>
                        <Typography variant="caption" sx={{ fontSize: '0.8rem', color: item.c, lineHeight: 1 }}>{item.i}</Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.35rem', color: '#333', textAlign: 'center', mt: 0.5, fontWeight: 600 }}>{item.t}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Canvas Area */}
            <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#fff' }}>
                {/* Background Grid */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)', backgroundSize: '15px 15px', zIndex: 0 }} />

                {/* Nodes Container */}
                <Box sx={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: 1 }}>

                    {/* Node 1: Start Task */}
                    <Box sx={{ position: 'absolute', top: 30, left: 20, background: '#fff', border: '1px solid #e0e0e0', borderRadius: '6px', width: '120px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.5, px: 1, background: '#fafafa', borderBottom: '1px solid #f0f0f0', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#8bc34a' }}>▶</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 700, color: '#333', flexGrow: 1 }}>START_TASK</Typography>
                            <Box sx={{ width: 10, height: 10, background: '#2196F3', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ background: '#f5f5f5', p: 0.5, border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ fontSize: '0.45rem', color: '#333' }}>Lead Received</Typography>
                                <Box sx={{ width: 10, height: 10, background: '#2196F3', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#4caf50', background: '#e8f5e9', px: 0.5, py: 0.2, borderRadius: 1 }}>Connection Task ●</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Connector 1 */}
                    <svg style={{ position: 'absolute', top: 75, left: 140, width: 40, height: 20, zIndex: 0, overflow: 'visible' }}>
                        <path d="M 0 0 C 20 0, 20 20, 40 20" fill="none" stroke="#2196F3" strokeWidth="1.5" />
                        <polygon points="40,20 34,17 34,23" fill="#2196F3" />
                    </svg>

                    {/* Node 2: AI Task */}
                    <Box sx={{ position: 'absolute', top: 60, left: 180, background: '#fff', border: '1px solid #e0e0e0', borderRadius: '6px', width: '120px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.5, px: 1, background: '#fafafa', borderBottom: '1px solid #f0f0f0', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#9c27b0' }}>🤖</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 700, color: '#333', flexGrow: 1 }}>AI Task</Typography>
                            <Box sx={{ width: 10, height: 10, background: '#2196F3', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ background: '#f5f5f5', p: 0.5, border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ fontSize: '0.45rem', color: '#333' }}>Qualify Lead</Typography>
                                <Box sx={{ width: 10, height: 10, background: '#2196F3', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 1, gap: 0.5 }}>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#4caf50', background: '#e8f5e9', px: 0.5, py: 0.2, borderRadius: 1 }}>Hot Lead ●</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#ff9800', background: '#fff3e0', px: 0.5, py: 0.2, borderRadius: 1 }}>Cold Lead ●</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Connector 2 (Hot) */}
                    <svg style={{ position: 'absolute', top: 115, left: 300, width: 30, height: 20, zIndex: 0, overflow: 'visible' }}>
                        <path d="M 0 0 C 15 0, 15 -30, 30 -30" fill="none" stroke="#2196F3" strokeWidth="1.5" />
                        <polygon points="30,-30 24,-33 24,-27" fill="#2196F3" />
                    </svg>

                    {/* Connector 3 (Cold) */}
                    <svg style={{ position: 'absolute', top: 130, left: 300, width: 30, height: 40, zIndex: 0, overflow: 'visible' }}>
                        <path d="M 0 0 C 15 0, 15 30, 30 30" fill="none" stroke="#2196F3" strokeWidth="1.5" />
                        <polygon points="30,30 24,27 24,33" fill="#2196F3" />
                    </svg>

                    {/* Node 3: User Task (Hot Lead) */}
                    <Box sx={{ position: 'absolute', top: 50, left: 330, background: '#fff', border: '1px solid #e0e0e0', borderRadius: '6px', width: '120px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.5, px: 1, background: '#fafafa', borderBottom: '1px solid #f0f0f0', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#ff9800' }}>👤</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 700, color: '#333', flexGrow: 1 }}>User Task</Typography>
                            <Box sx={{ width: 10, height: 10, background: '#2196F3', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ background: '#f5f5f5', p: 0.5, border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ fontSize: '0.45rem', color: '#333' }}>Agent Call</Typography>
                                <Box sx={{ width: 10, height: 10, background: '#2196F3', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#4caf50', background: '#e8f5e9', px: 0.5, py: 0.2, borderRadius: 1 }}>Connection Task ●</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Node 4: Email Task (Cold Lead) */}
                    <Box sx={{ position: 'absolute', top: 135, left: 330, background: '#fff', border: '1px solid #e0e0e0', borderRadius: '6px', width: '120px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.5, px: 1, background: '#fafafa', borderBottom: '1px solid #f0f0f0', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#ffc107' }}>✉</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.45rem', fontWeight: 700, color: '#333', flexGrow: 1 }}>Email Task</Typography>
                            <Box sx={{ width: 10, height: 10, background: '#2196F3', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ background: '#f5f5f5', p: 0.5, border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ fontSize: '0.45rem', color: '#333' }}>Nurture Campaign</Typography>
                                <Box sx={{ width: 10, height: 10, background: '#2196F3', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontSize: '0.4rem', lineHeight: 1 }}>✓</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <Typography variant="caption" sx={{ fontSize: '0.4rem', color: '#4caf50', background: '#e8f5e9', px: 0.5, py: 0.2, borderRadius: 1 }}>Connection Task ●</Typography>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    </Box>
);
const PaymentMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, p: 2, background: '#fff', borderRadius: '16px', border: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', gap: 2, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ p: 2, background: '#f5f5f5', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#888', fontWeight: 600, mb: 1 }}>ORDER #4409 TOTAL</Typography>
            <Typography variant="h3" sx={{ color: '#0A0A0A', fontWeight: 900 }}>₹14,000</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f0f0' }}>
                <Typography variant="caption" sx={{ color: '#555' }}>Studio Headphones</Typography>
                <Typography variant="caption" sx={{ color: '#000', fontWeight: 600 }}>₹12,000</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, borderBottom: '1px solid #f0f0f0' }}>
                <Typography variant="caption" sx={{ color: '#555' }}>Shipping</Typography>
                <Typography variant="caption" sx={{ color: '#000', fontWeight: 600 }}>₹2,000</Typography>
            </Box>
        </Box>
        <Button variant="contained" sx={{ mt: 'auto', background: '#2563EB', color: '#fff', fontWeight: 800, borderRadius: '8px', textTransform: 'none', py: 1.5, '&:hover': { background: '#1D4ED8' } }}>
            PAY SECURELY NOW
        </Button>
    </Box>
);

// Mockup 6: Analytics Dashboard UI
const AnalyticsMockup = () => (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 2, p: 2, background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 700, letterSpacing: '0.1em' }}>AUTO-TESTIMONIAL</Typography>
            <Typography variant="caption" sx={{ color: '#25D366', fontWeight: 700 }}>VERIFIED</Typography>
        </Box>

        <Box sx={{ p: 2, background: '#F8F9FA', borderRadius: '12px', border: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar src="https://i.pravatar.cc/150?img=47" sx={{ width: 40, height: 40 }} />
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0A0A0A', lineHeight: 1 }}>Emma Carter</Typography>
                    <Typography variant="caption" sx={{ color: '#F5A623', fontSize: '1rem', letterSpacing: '2px' }}>★★★★★</Typography>
                </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#425466', fontStyle: 'italic', mt: 1, fontSize: '0.85rem' }}>
                "Absolutely incredible experience! The AI handled everything seamlessly. The trip booking and the checkout process via WhatsApp was magical."
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Box component="img" src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=100&q=80" sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }} />
                <Box component="img" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=80" sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }} />
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
                    backgroundColor: '#FFFFFF',
                    color: '#0A0A0A',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid #E0E0E0',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
                }}
                whileHover={{
                    scale: 0.98,
                    borderColor: '#2563EB',
                    transition: { duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        opacity: 0.04,
                        fontSize: { xs: '6rem', md: '8rem' },
                        position: 'absolute',
                        top: '-20px',
                        right: '-10px',
                        WebkitTextStroke: '1px #2563EB',
                        color: 'transparent'
                    }}
                >
                    {feature.number}
                </Typography>

                <Box sx={{ zIndex: 1, position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography variant="overline" sx={{ color: '#2563EB', letterSpacing: '0.2em', fontWeight: 600 }}>
                        CAPABILITY {feature.number}
                    </Typography>
                    <Typography variant="h3" sx={{ mt: 2, mb: 0, fontWeight: 900, fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1.2, textTransform: 'uppercase', color: '#0A0A0A' }}>
                        {feature.title}
                    </Typography>

                    {renderMockup(feature.mockup)}

                </Box>

                <Box sx={{ zIndex: 1, position: 'relative', mt: 'auto' }}>
                    <Box sx={{ width: '40px', height: '2px', background: '#2563EB', mb: 3 }} />
                    <Typography sx={{ color: '#425466', fontSize: '1.1rem', lineHeight: 1.6 }}>
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
                background: '#F4F6F8',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: { xs: 12, md: 20 } }}>
                    <Typography
                        variant="overline"
                        sx={{ color: '#000000', fontWeight: 900, letterSpacing: '0.2em', display: 'block', mb: 2 }}
                    >
                        // CORE INFRASTRUCTURE
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            color: '#000000',
                            fontWeight: 900,
                            fontSize: { xs: '2.5rem', md: '5rem' },
                            lineHeight: 1
                        }}
                    >
                        EVERYTHING YOU NEED
                        <Box sx={{ display: 'block', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em', mt: 1 }}>
                            TO SCALE.
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
