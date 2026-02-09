-- Enable RLS on new tables
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON favorites
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can add their own favorites" ON favorites
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own favorites" ON favorites
    FOR DELETE USING (user_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can view messages they sent or received" ON messages
    FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update messages they received (mark as read)" ON messages
    FOR UPDATE USING (receiver_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid());
