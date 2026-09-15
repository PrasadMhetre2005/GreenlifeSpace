-- Initial Greenlife Spaces offers. Run after schema.sql.

INSERT INTO offers (slug, name, short_description, description, starting_price_label, starting_price_inr, display_order)
VALUES
  ('plant-styling', 'Plant Styling', 'Choosing and placing plants for a space', 'We assess light, footfall and the mood you want, then select and place plants and pots that suit the space.', 'From INR 2,500', 2500, 1),
  ('plant-maintenance', 'Plant Maintenance', 'Scheduled watering, feeding and pruning', 'Regular visits to water, feed, prune and check for pests, so your plants stay healthy without anyone in-house needing to think about it.', 'From INR 999 / visit', 999, 2),
  ('plant-polishing', 'Plant Polishing', 'Leaf cleaning for a showroom finish', 'We hand-clean and polish foliage so plants look showroom-fresh for events, photoshoots or everyday impressions.', 'From INR 799 / visit', 799, 3),
  ('office-greening', 'Office Greening', 'Full plant programs for workplaces', 'An end-to-end plant program for offices and coworking spaces: selection, delivery, placement and a standing maintenance schedule.', 'Custom quote', NULL, 4),
  ('event-styling', 'Event & Hotel Styling', 'Short-term greenery for events and lobbies', 'Temporary and seasonal plant displays for weddings, launches, hotel lobbies and receptions — delivered, styled and collected.', 'Custom quote', NULL, 5),
  ('plant-doctor', 'Plant Doctor Visit', 'Diagnosis for a struggling plant', 'A one-off visit to diagnose yellowing leaves, pests or poor growth, with a written care plan you can follow yourself.', 'From INR 599 / visit', 599, 6)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  starting_price_label = EXCLUDED.starting_price_label,
  starting_price_inr = EXCLUDED.starting_price_inr,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();